document.addEventListener('DOMContentLoaded', () => {
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
  const zipNameAddDate = document.getElementById('zipNameAddDate');
  const zipNameAddBoard = document.getElementById('zipNameAddBoard');
  const zipNameAddCount = document.getElementById('zipNameAddCount');
  const imageThresholdInput = document.getElementById('imageThreshold');
  const timeoutSecondsInput = document.getElementById('timeoutSeconds');
  const status = document.getElementById('status');
  const resetBtn = document.getElementById('resetOptions');
  // Styling
  const buttonPositionSelect = document.getElementById('buttonPosition');

  // Default values
  const DEFAULTS = {
    modifierKey: 'alt',
    useOriginalFilenames: true,
    showNoDialogBtn: false,
    showIndividualBtn: true,
    showZipBtn: false,
    buttonPosition: 'top-right',
    zipNameAddDate: false,
    zipNameAddBoard: false,
    zipNameAddCount: true,
    imageThreshold: 20,
    timeoutSeconds: 2,
    defaultFolder: '',
    boardFolders: {}
  };

  let boardFolders = {};

  // Load saved options
  chrome.storage.sync.get([
    'modifierKey', 'showNoDialogBtn', 'showIndividualBtn', 'showZipBtn', 'defaultFolder', 'boardFolders',
    'zipNameAddDate', 'zipNameAddBoard', 'zipNameAddCount',
    'imageThreshold', 'timeoutSeconds', 'buttonPosition', 'useOriginalFilenames'
  ], (items) => {
    if (items.modifierKey) modifierKeySelect.value = items.modifierKey;
    useOriginalFilenames.checked = !!items.useOriginalFilenames;
    buttonPositionSelect.value = items.buttonPosition || 'top-right';
    showNoDialogBtn.checked = !!items.showNoDialogBtn;
    showIndividualBtn.checked = items.showIndividualBtn !== false; // default true
    showZipBtn.checked = !!items.showZipBtn;
    defaultFolderInput.value = items.defaultFolder || '';
    boardFolders = items.boardFolders || {};
    zipNameAddDate.checked = !!items.zipNameAddDate;
    zipNameAddBoard.checked = !!items.zipNameAddBoard;
    zipNameAddCount.checked = !!items.zipNameAddCount;
    imageThresholdInput.value = typeof items.imageThreshold === 'number' ? items.imageThreshold : 20;
    timeoutSecondsInput.value = typeof items.timeoutSeconds === 'number' ? items.timeoutSeconds : 2;
    renderBoardFolders();
  });

  function renderBoardFolders() {
    boardFoldersBody.innerHTML = '';
    Object.entries(boardFolders).forEach(([board, folder]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${board}</td>
        <td>${folder}</td>
        <td><span class="remove-btn" data-board="${board}">Remove</span></td>
      `;
      boardFoldersBody.appendChild(tr);
    });
    // Attach remove handlers
    Array.from(document.querySelectorAll('.remove-btn')).forEach(btn => {
      btn.addEventListener('click', (e) => {
        const board = btn.getAttribute('data-board');
        delete boardFolders[board];
        renderBoardFolders();
      });
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

  // Reset handler
  resetBtn.addEventListener('click', () => {
    if (!confirm('Reset all options to default values?')) return;
    chrome.storage.sync.set(DEFAULTS, () => {
      // Update UI to reflect defaults
      modifierKeySelect.value = DEFAULTS.modifierKey;
      useOriginalFilenames.checked = DEFAULTS.useOriginalFilenames;
      showNoDialogBtn.checked = DEFAULTS.showNoDialogBtn;
      showIndividualBtn.checked = DEFAULTS.showIndividualBtn;
      showZipBtn.checked = DEFAULTS.showZipBtn;
      buttonPositionSelect.value = DEFAULTS.buttonPosition;
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
      // Also update the noDialogNote visibility
      if (typeof toggleNoDialogNote === 'function') toggleNoDialogNote();
    });
  });

  // Save Options (submit)
  document.getElementById('options-form').addEventListener('submit', (e) => {
    e.preventDefault();
    chrome.storage.sync.set({
      buttonPosition: buttonPositionSelect.value,
      modifierKey: modifierKeySelect.value,
      useOriginalFilenames: useOriginalFilenames.checked,
      showNoDialogBtn: showNoDialogBtn.checked,
      showIndividualBtn: showIndividualBtn.checked,
      showZipBtn: showZipBtn.checked,
      defaultFolder: defaultFolderInput.value,
      boardFolders: boardFolders,
      zipNameAddDate: zipNameAddDate.checked,
      zipNameAddBoard: zipNameAddBoard.checked,
      zipNameAddCount: zipNameAddCount.checked,
      imageThreshold: parseInt(imageThresholdInput.value, 10) || 20,
      timeoutSeconds: parseInt(timeoutSecondsInput.value, 10) || 2
    }, () => {
      status.textContent = 'Options saved!';
      setTimeout(() => status.textContent = '', 1500);
    });
  });
});

// Show Note on checkbox tick
document.addEventListener('DOMContentLoaded', function () {
  const showNoDialogBtn = document.getElementById('showNoDialogBtn');
  const noDialogNote = document.getElementById('noDialogNote');
  function toggleNoDialogNote() {
    noDialogNote.style.display = showNoDialogBtn.checked ? 'block' : 'none';
  }
  showNoDialogBtn.addEventListener('change', toggleNoDialogNote);
  // Initialize on load (in case the box is checked from saved settings)
  toggleNoDialogNote();
});