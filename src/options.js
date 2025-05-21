/**
 * 4chins Batch Downloader Addon - Options Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const modifierKeySelect = document.getElementById('modifierKey');
  const useOriginalFilenames = document.getElementById('useOriginalFilenames');
  const showNoDialogBtn = document.getElementById('showNoDialogBtn');
  const showIndividualBtn = document.getElementById('showIndividualBtn');
  const showZipBtn = document.getElementById('showZipBtn');
  const defaultFolderInput = document.getElementById('defaultFolder');
  const boardFoldersBody = document.getElementById('boardFoldersBody');
  const newBoardInput = document.getElementById('newBoard');
  const newFolderInput = document.getElementById('newFolder');
  const addBoardFolderBtn = document.getElementById('addBoardFolder');
  const overwriteExistingFiles = document.getElementById('overwriteExistingFiles');
  const zipNameAddDate = document.getElementById('zipNameAddDate');
  const zipNameAddBoard = document.getElementById('zipNameAddBoard');
  const zipNameAddCount = document.getElementById('zipNameAddCount');
  const imageThresholdInput = document.getElementById('imageThreshold');
  const timeoutSecondsInput = document.getElementById('timeoutSeconds');
  const status = document.getElementById('status');
  const resetBtn = document.getElementById('resetOptions');
  // Styling
  const buttonColorInput = document.getElementById('buttonColor');
  const glowColorInput = document.getElementById('glowColor');
  const buttonPositionSelect = document.getElementById('buttonPosition');
  const showNoDialogNote = document.getElementById('noDialogNote');

  // --- Default values ---
  const DEFAULTS = {
    modifierKey: 'alt',
    useOriginalFilenames: false,
    showNoDialogBtn: false,
    showIndividualBtn: true,
    showZipBtn: true,
    buttonPosition: 'top-right',
    overwriteExistingFiles: false,
    zipNameAddDate: false,
    zipNameAddBoard: false,
    zipNameAddCount: false,
    imageThreshold: 20,
    timeoutSeconds: 2,
    defaultFolder: '',
    buttonColor: '#2d8cf0',
    glowColor: '#2d8cf0',
    boardFolders: {}
  };

  let boardFolders = {};

  // --- Utility: Fallback to default for missing keys ---
  function getOption(items, key) {
    if (typeof DEFAULTS[key] === 'boolean')
      return typeof items[key] === 'boolean' ? items[key] : DEFAULTS[key];
    if (typeof DEFAULTS[key] === 'number')
      return typeof items[key] === 'number' ? items[key] : DEFAULTS[key];
    if (typeof DEFAULTS[key] === 'string')
      return typeof items[key] === 'string' ? items[key] : DEFAULTS[key];
    if (typeof DEFAULTS[key] === 'object')
      return typeof items[key] === 'object' && items[key] !== null ? items[key] : DEFAULTS[key];
    return DEFAULTS[key];
  }

  // --- Load saved options ---
  chrome.storage.sync.get(Object.keys(DEFAULTS), (items) => {
    items = items || {};
    modifierKeySelect.value = getOption(items, 'modifierKey');
    buttonColorInput.value = getOption(items, 'buttonColor');
    glowColorInput.value = getOption(items, 'glowColor');
    useOriginalFilenames.checked = getOption(items, 'useOriginalFilenames');
    showNoDialogBtn.checked = getOption(items, 'showNoDialogBtn');
    showIndividualBtn.checked = getOption(items, 'showIndividualBtn');
    showZipBtn.checked = getOption(items, 'showZipBtn');
    buttonPositionSelect.value = getOption(items, 'buttonPosition');
    overwriteExistingFiles.checked = getOption(items, 'overwriteExistingFiles');
    zipNameAddDate.checked = getOption(items, 'zipNameAddDate');
    zipNameAddBoard.checked = getOption(items, 'zipNameAddBoard');
    zipNameAddCount.checked = getOption(items, 'zipNameAddCount');
    imageThresholdInput.value = getOption(items, 'imageThreshold');
    timeoutSecondsInput.value = getOption(items, 'timeoutSeconds');
    defaultFolderInput.value = getOption(items, 'defaultFolder');
    boardFolders = getOption(items, 'boardFolders');
    renderBoardFolders();
    toggleNoDialogNote();
  });

  // --- Board folders table rendering ---
  function renderBoardFolders() {
    boardFoldersBody.innerHTML = '';
    Object.entries(boardFolders).forEach(([board, folder]) => {
      const tr = document.createElement('tr');

      const tdBoard = document.createElement('td');
      tdBoard.textContent = board;

      const tdFolder = document.createElement('td');
      tdFolder.textContent = folder;

      const tdRemove = document.createElement('td');
      const removeBtn = document.createElement('span');
      removeBtn.className = 'remove-btn';
      removeBtn.setAttribute('data-board', board);
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        delete boardFolders[board];
        renderBoardFolders();
      });
      tdRemove.appendChild(removeBtn);

      tr.appendChild(tdBoard);
      tr.appendChild(tdFolder);
      tr.appendChild(tdRemove);

      boardFoldersBody.appendChild(tr);
    });
  }

  addBoardFolderBtn.addEventListener('click', () => {
    const board = newBoardInput.value.trim();
    const folder = newFolderInput.value.trim();
    if (board && folder) {
      boardFolders[board] = folder;
      renderBoardFolders();
      newBoardInput.value = '';
      newFolderInput.value = '';
    }
  });

  // --- Save Options (submit) ---
  document.getElementById('options-form').addEventListener('submit', (e) => {
    e.preventDefault();
    chrome.storage.sync.set({
      modifierKey: modifierKeySelect.value,
      buttonColor: buttonColorInput.value || DEFAULTS.buttonColor,
      glowColor: glowColorInput.value || DEFAULTS.glowColor,
      useOriginalFilenames: useOriginalFilenames.checked,
      showNoDialogBtn: showNoDialogBtn.checked,
      showIndividualBtn: showIndividualBtn.checked,
      overwriteExistingFiles: overwriteExistingFiles.checked,
      showZipBtn: showZipBtn.checked,
      buttonPosition: buttonPositionSelect.value,
      zipNameAddDate: zipNameAddDate.checked,
      zipNameAddBoard: zipNameAddBoard.checked,
      zipNameAddCount: zipNameAddCount.checked,
      imageThreshold: parseInt(imageThresholdInput.value, 10) || DEFAULTS.imageThreshold,
      timeoutSeconds: parseInt(timeoutSecondsInput.value, 10) || DEFAULTS.timeoutSeconds,
      defaultFolder: defaultFolderInput.value,
      boardFolders: boardFolders
    }, () => {
      status.textContent = 'Options saved!';
      setTimeout(() => status.textContent = '', 1500);
    });
  });

  // --- Reset handler ---
  resetBtn.addEventListener('click', () => {
    if (!confirm('Reset all options to default values?')) return;
    chrome.storage.sync.set(DEFAULTS, () => {
      // Update UI to reflect defaults
      modifierKeySelect.value = DEFAULTS.modifierKey;
      buttonColorInput.value = DEFAULTS.buttonColor;
      glowColorInput.value = DEFAULTS.glowColor;
      useOriginalFilenames.checked = DEFAULTS.useOriginalFilenames;
      showNoDialogBtn.checked = DEFAULTS.showNoDialogBtn;
      showIndividualBtn.checked = DEFAULTS.showIndividualBtn;
      showZipBtn.checked = DEFAULTS.showZipBtn;
      buttonPositionSelect.value = DEFAULTS.buttonPosition;
      overwriteExistingFiles.checked = DEFAULTS.overwriteExistingFiles;
      zipNameAddDate.checked = DEFAULTS.zipNameAddDate;
      zipNameAddBoard.checked = DEFAULTS.zipNameAddBoard;
      zipNameAddCount.checked = DEFAULTS.zipNameAddCount;
      imageThresholdInput.value = DEFAULTS.imageThreshold;
      timeoutSecondsInput.value = DEFAULTS.timeoutSeconds;
      defaultFolderInput.value = DEFAULTS.defaultFolder;
      boardFolders = {};
      renderBoardFolders();
      status.textContent = 'Options reset to defaults!';
      setTimeout(() => status.textContent = '', 1500);
      toggleNoDialogNote();
    });
  });

  // --- Show Note on checkbox tick ---
  function toggleNoDialogNote() {
    if (!showNoDialogNote) return;
    showNoDialogNote.style.display = showNoDialogBtn.checked ? 'block' : 'none';
  }
  showNoDialogBtn.addEventListener('change', toggleNoDialogNote);
});