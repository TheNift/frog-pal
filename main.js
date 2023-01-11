const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');

let win;

function dataToRender(data) {
    console.log(data);
    win.webContents.send("from-main", data);
}

const createWindow = () => {
    win = new BrowserWindow({
        width: 300,
        height: 700,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
    });

    win.loadFile('index.html');
};

app.whenReady().then(() => {
    ipcMain.handle("to-main", (event, data) => {
        dataToRender(data);
    });
    createWindow();
});