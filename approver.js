const { BrowserWindow, app } = require('electron'); 
const path = require('path');

class Approver {
    approverWindow = null;
    createWindow() {
        const approverWindow = new BrowserWindow({
            title: 'Approve files',
            webPreferences: {
                preload: path.join(__dirname, 'preload-approver.js'),
                nodeIntegration: true,
                contextIsolation: false,
            },
            autoHideMenuBar: true,
            icon: __dirname + '/resources/notification.png',
            show: false,
            darkTheme: true,
            // titleBarStyle: 'hidden',
            titleBarOverlay: {
                color: '#2f3241',
                symbolColor: '#74b1be',
                height: 30,
            },
        });

        approverWindow.loadURL(__dirname + '/templates/approver.html');

        approverWindow.on('ready-to-show', () => {
            // destroy existing notification before showing a new one
            if (this.approverWindow !== null) {
                this.approverWindow.destroy();
            }
            this.approverWindow = approverWindow;

            approverWindow.show();
        });
    

        // this.approverWindow = approverWindow;
    }
}

module.exports = new Approver();
