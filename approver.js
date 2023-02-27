const { BrowserWindow } = require('electron'); 

class Approver {
    window = null;
    createWindow() {
        this.window = new BrowserWindow({
            'title': 'Approve files',
            'webPreferences': {
                'nodeIntegration': true,
                'contextIsolation': false,
            },
            'autoHideMenuBar': true,
            'icon': __dirname + '/resources/notification.png',
        });

        this.window.loadURL(__dirname + '/templates/approver.html');
    }
}

module.exports = new Approver();
