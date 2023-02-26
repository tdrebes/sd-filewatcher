const { app, BrowserWindow, screen, ipcMain, Notification } = require('electron');
const path = require('path');
const Tray = require('./tray');

if (process.platform === 'win32')
{
    app.setAppUserModelId('Notifier');
}

const tray = new Tray();

let currentNotificationWindow = null;

function createNotificationWindow(title, body) {
  const display = screen.getPrimaryDisplay();
  const displayWidth = display.bounds.width;
  const displayHeight = display.bounds.height;
  const notificationWindow = new BrowserWindow({
    x: displayWidth - 320,
    y: displayHeight - 200,
    height: 150,
    width: 300,
    webPreferences: {
      preload: path.join(__dirname, "preload-notification.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
    frame: false,
    alwaysOnTop: true,
    minimizable: false,
    maximizable: false,
    resizable: false,
    skipTaskbar: true,
    // backgroundColor: '#2e2e2e',
  });

  notificationWindow.loadFile(path.join(__dirname, "./templates/notification.html"), {query: {"data": JSON.stringify({'title': NOTIFICATION_TITLE, 'body': NOTIFICATION_BODY})}});

  notificationWindow.on('ready-to-show', () => {
    // destroy existing notification before showing a new one
    if (currentNotificationWindow !== null) {
      currentNotificationWindow.destroy();
    }
    currentNotificationWindow = notificationWindow;

    notificationWindow.showInactive();
  });

  setTimeout(() => {
    if (!notificationWindow.isDestroyed()) {
      // Uncomment to close notifications after timeout
      // notificationWindow.destroy(); 
      //console.log('Notification closed by timeout');
    }
  }, 10000)

  return notificationWindow;
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
  createNotificationWindow('Notification', 'This is the content of a notification.');
});

tray.on('create-test-notification-windows', () => {
  console.log('Test Notification (Windows) triggered.')
  new Notification({
    title: 'Notification',
    body: 'This is the content of a notification.',
  }).show();
})

ipcMain.on('action_close', (event, arg) => {
  if (currentNotificationWindow !== null) {
    currentNotificationWindow.destroy();
    console.log('Notification closed.');
  }
});

ipcMain.on('log', (event, arg) => {
  console.log(arg);
});
