const { app, BrowserWindow } = require("electron");

let win = null;

const createWindow = () => {
    win = new BrowserWindow({
        width: 300,
        height: 700,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');
};

app.whenReady().then(createWindow);