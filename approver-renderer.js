const { ipcRenderer } = require('electron');

ipcRenderer.send('log', 'Approver-Renderer initialized.');

document.getElementById('action_close').addEventListener('click', () => {
    ipcRenderer.send('approver_action_close');
})
