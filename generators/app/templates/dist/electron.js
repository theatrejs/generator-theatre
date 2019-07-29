const path = require('path');
const {app, globalShortcut, BrowserWindow} = require('electron');

app.on('ready', () => {

    const accelerators = [

        'CommandOrControl+R',
        'CommandOrControl+W',
        'F11'
    ];

    let browser = new BrowserWindow({

        'frame': false,
        'fullscreen': true,
        'resizable': false,
        'useContentSize': true,
        'webPreferences': {

            'devTools': false
        }
    });

    accelerators.forEach((accelerator) => {

        // unbinds annoying browser specific shortcuts
        globalShortcut.register(accelerator, () => {});
    });

    browser.on('closed', () => {

        browser = null;
    });

    browser.loadFile(path.resolve(__dirname, 'index.html'));
});
