const { BrowserWindow } = require('electron'); 

class Approver {
    window = null;
    createWindow() {
        this.window = new BrowserWindow({
            'title': 'Approve files',
            'webPreferences': {
                'nodeIntegration': true,
            },
            'autoHideMenuBar': true,
            'icon': __dirname + '/resources/notification.png'
        });
    }
}

module.exports = new Approver();
