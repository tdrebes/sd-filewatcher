const { ipcRenderer } = require('electron');

ipcRenderer.send('log', 'Notification-Renderer initialized.');

document.getElementById('action_close').addEventListener('click', () => {
    ipcRenderer.send('action_close');
})
