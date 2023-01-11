const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 300,
        height: 700,
        resizable: false,
        autoHideMenuBar: true,
        webContents: {},
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
    });

    win.loadFile('index.html');
};

function dataToRender(data) {
    console.log("Data at main.js: ", data);
    win.webContents.send("from-main", data);
}

app.whenReady().then(() => {
    ipcMain.handle("to-main", (event, data) => {
        dataToRender(data);
    });
    createWindow();
});