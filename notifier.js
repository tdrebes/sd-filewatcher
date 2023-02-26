const { BrowserWindow, screen, Notification } = require('electron');
const path = require('path');

class Notifier {
    currentNotificationWindow = null;

    createNotificationWindow(title, body) {
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

        notificationWindow.loadFile(path.join(__dirname, "./templates/notification.html"), { query: { "data": JSON.stringify({ 'title': title, 'body': body }) } });

        notificationWindow.on('ready-to-show', () => {
            // destroy existing notification before showing a new one
            if (this.currentNotificationWindow !== null) {
                this.currentNotificationWindow.destroy();
            }
            this.currentNotificationWindow = notificationWindow;

            notificationWindow.showInactive();
        });

        setTimeout(() => {
            if (!notificationWindow.isDestroyed()) {
                // Uncomment to close notifications after timeout
                notificationWindow.destroy();
                console.log('Notification closed by timeout');
            }
        }, 10000);

        return notificationWindow;
    }

    createNativeNotification(title, body) {
        new Notification({
            title: 'Notification',
            body: 'This is the content of a notification.',
        }).show();
    }
}

module.exports = new Notifier();
