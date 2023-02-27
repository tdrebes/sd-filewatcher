const { app, ipcMain } = require('electron');

const tray = require('./tray');
const notifier = require('./notifier');
const approver = require('./approver');
const chokidar = require('chokidar');

require('dotenv').config();

if (process.platform === 'win32') {
  app.setAppUserModelId('Notifier');
}

app.whenReady().then(() => {
  tray.render();
});

app.on('window-all-closed', (e) => e.preventDefault());

tray.on('exit', () => {
  app.quit();
});

tray.on('create-test-notification', () => {
  console.log('Test Notification triggered.');
  notifier.createNotificationWindow('Notification', 'This is the content of a notification.');
});

tray.on('create-test-notification-windows', () => {
  console.log('Test Notification (Windows) triggered.');
  notifier.createNativeNotification('Notification', 'This is the content of a notification.');
});

tray.on('approve-files', () => {
  console.log('Approve Files triggered.');
  approver.createWindow();
})

ipcMain.on('action_close', (event, arg) => {
  if (notifier.currentNotificationWindow !== null) {
    notifier.currentNotificationWindow.destroy();
    console.log('Notification closed.');
  }
});

ipcMain.on('log', (event, arg) => {
  console.log(arg);
});

chokidar.watch(process.env.WATCH_DIR).on('add', (path, stats) => {
  if (Math.abs(Date.now() - stats.atimeMs) < 1000) {
    console.log(`Added file ${path}`);
    notifier.createNotificationWindow('New File!', `File <b>${path.split(/[\\/]/).pop()}</b> is ready for review.`);
  }
});
