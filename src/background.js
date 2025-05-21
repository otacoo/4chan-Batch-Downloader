import JSZip from './vendor/jszip-esm.js';

/**
 * 4chins Batch Downloader Addon - Background Script
 */

// Extension default settings
const DEFAULTS = {
  modifierKey: 'alt',
  useOriginalFilenames: false,
  showNoDialogBtn: false,
  showIndividualBtn: true,
  showZipBtn: true,
  buttonPosition: 'top-right',
  zipNameAddDate: false,
  zipNameAddBoard: false,
  zipNameAddCount: false,
  imageThreshold: 20,
  timeoutSeconds: 2,
  defaultFolder: '',
  boardFolders: {}
};

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.sync.set(DEFAULTS);
  }
});

// Store status for Downloading/Canceling
let cancelRequested = false;
let isDownloading = false; // Prevent overlapping downloads

// Helper: get current date string for zip naming
function getCurrentDateString() {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
}

// Helper: get board name from image URLs
function getBoardNameFromFiles(files) {
  if (!files.length) return '';
  // Try to extract board name from the first url (e.g. https://i.4cdn.org/a/...)
  const match = files[0].url.match(/:\/\/i\.4cdn\.org\/([a-z0-9]+)\//i);
  return match ? match[1] : '';
}

// Message Handler
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);
  // Handle cancel request
  if (message.action === "cancelDownload") {
    cancelRequested = true;
    isDownloading = false;
    sendResponse && sendResponse({ status: "cancel_set" });
    return;
  }

  if (message.action === "downloadImages" && Array.isArray(message.files)) {
    if (isDownloading) {
      sendResponse && sendResponse({ status: "busy" });
      return;
    }
    isDownloading = true;
    cancelRequested = false;
    const folder = message.folder || '';
    const tabId = sender.tab && sender.tab.id;
    const noDialog = !!message.noDialog;
    const imageThreshold = typeof message.imageThreshold === 'number' ? message.imageThreshold : 20;
    const timeoutSeconds = typeof message.timeoutSeconds === 'number' ? message.timeoutSeconds : 2;
    const useOriginalFilenames = !!message.useOriginalFilenames;

    // Fetch overwriteExistingFiles option from storage
    chrome.storage.sync.get(['overwriteExistingFiles'], (opts) => {
      const overwriteExistingFiles = !!opts.overwriteExistingFiles;
      if (message.zip) {
        chrome.storage.sync.get(['zipNameAddDate', 'zipNameAddBoard', 'zipNameAddCount'], (zipOpts) => {
          zipAndDownloadImages(message.files, folder, zipOpts, tabId, imageThreshold, timeoutSeconds, useOriginalFilenames)
            .then((result) => {
              isDownloading = false;
              sendResponse && sendResponse({ status: result === 'cancelled' ? "zip_cancelled" : "zip_started" });
            })
            .catch(err => {
              isDownloading = false;
              sendResponse && sendResponse({ status: "zip_failed", error: err?.toString() });
            });
        });
        return;
      } else {
        downloadImagesWithProgress(
          message.files,
          folder,
          tabId,
          noDialog,
          imageThreshold,
          timeoutSeconds,
          useOriginalFilenames,
          overwriteExistingFiles // Pass the option here
        ).then((result) => {
          isDownloading = false;
          sendResponse && sendResponse({ status: result === 'cancelled' ? "cancelled" : "started" });
        });
      }
    });
    return true;
  }
  return true;
});

// Downloads images individually, with progress and cancellation support
async function downloadImagesWithProgress(
  files,
  folder,
  tabId,
  noDialog,
  imageThreshold = 20,
  timeoutSeconds = 2,
  useOriginalFilenames = false,
  overwriteExistingFiles = false // Accept as argument
) {
  for (let i = 0; i < files.length; i++) {
    if (cancelRequested) {
      if (tabId) chrome.tabs.sendMessage(tabId, { type: 'fetch-cancelled' });
      return 'cancelled';
    }
    const { url, originalFilename } = files[i];
    let filename = url.split('/').pop().split('?')[0] || `image${i + 1}`;
    if (useOriginalFilenames && originalFilename) filename = originalFilename;
    if (tabId) {
      chrome.tabs.sendMessage(tabId, {
        type: 'fetch-progress',
        current: i + 1,
        total: files.length,
        filename
      });
    }
    // If using original filenames, always uniquify to avoid overwriting
    const conflictAction = useOriginalFilenames ? "uniquify" : (overwriteExistingFiles ? "overwrite" : "uniquify");
    await new Promise(resolve => {
      chrome.downloads.download({
        url,
        filename: folder ? `${folder}/${filename}` : filename,
        conflictAction: conflictAction,
        saveAs: !noDialog
      }, () => resolve());
    });
    // Throttle only after threshold is reached
    if (imageThreshold > 0 && timeoutSeconds > 0 && i + 1 > imageThreshold) {
      await new Promise(res => setTimeout(res, timeoutSeconds * 1000));
    }
  }
  if (cancelRequested) {
    if (tabId) chrome.tabs.sendMessage(tabId, { type: 'fetch-cancelled' });
    return 'cancelled';
  }
  if (tabId) {
    chrome.tabs.sendMessage(tabId, { type: 'fetch-complete' });
  }
  return 'done';
}

// Fetches all URLs, zips them, and triggers a single download
async function zipAndDownloadImages(files, folder, opts, tabId, imageThreshold = 20, timeoutSeconds = 2, useOriginalFilenames = false) {
  const zip = new JSZip();
  for (let i = 0; i < files.length; i++) {
    if (cancelRequested) {
      if (tabId) chrome.tabs.sendMessage(tabId, { type: 'fetch-cancelled' });
      return 'cancelled';
    }
    const { url, originalFilename } = files[i];
    let filename = url.split('/').pop().split('?')[0] || `image${i + 1}`;
    if (useOriginalFilenames && originalFilename) filename = originalFilename;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      zip.file(filename, blob);

      // Send progress update to content script
      if (tabId) {
        chrome.tabs.sendMessage(tabId, {
          type: 'fetch-progress',
          current: i + 1,
          total: files.length,
          filename
        });
      }
    } catch (e) {
      if (tabId) {
        chrome.tabs.sendMessage(tabId, {
          type: 'fetch-progress',
          current: i + 1,
          total: files.length,
          filename: `Failed to fetch: ${url}`
        });
      }
    }
    // Throttle only after threshold is reached
    if (imageThreshold > 0 && timeoutSeconds > 0 && i + 1 > imageThreshold) {
      await new Promise(res => setTimeout(res, timeoutSeconds * 1000));
    }
  }
  if (cancelRequested) {
    if (tabId) chrome.tabs.sendMessage(tabId, { type: 'fetch-cancelled' });
    return 'cancelled';
  }
  // Build zip filename
  let zipNameParts = ['4BD'];
  if (opts.zipNameAddBoard) {
    const board = getBoardNameFromFiles(files);
    if (board) zipNameParts.push(board);
  }
  if (opts.zipNameAddDate) {
    zipNameParts.push(getCurrentDateString());
  }
  if (opts.zipNameAddCount) {
    zipNameParts.push(`(${files.length}_files)`);
  }
  let zipName = zipNameParts.join('_') + '.zip';

  const content = await zip.generateAsync({ type: "blob" });

  const reader = new FileReader();
  reader.onloadend = function () {
    if (cancelRequested) {
      if (tabId) chrome.tabs.sendMessage(tabId, { type: 'fetch-cancelled' });
      return;
    }
    const dataUrl = reader.result;
    chrome.downloads.download({
      url: dataUrl,
      filename: folder ? `${folder}/${zipName}` : zipName,
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('Download failed:', chrome.runtime.lastError);
      } else {
        console.log('Download started, id:', downloadId);
      }
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { type: 'fetch-complete' });
      }
    });
  };
  reader.readAsDataURL(content);
  return 'done';
}