const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');

// VARIABLES
let win;
let bruh = "IIII#143";
// END VARIABLES

// CREATE ELECTRON WINDOW
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
// END CREATE ELECTRON WINDOW

// DATA TO FRONTEND
function startLoad(nametag) {
    win.webContents.send("start-load", nametag);
}

function renderNametag(nametag) {
    win.webContents.send("opponent-nametag", nametag);
}

function renderDisplayName(displayName) {
    win.webContents.send("opponent-displayname", displayName);
}
// END DATA TO FRONTEND

app.whenReady().then(() => {
    ipcMain.handle("opponent-data", (event, data) => {
        renderNametag(bruh);
        renderDisplayName(data.displayName);
    });
    createWindow();
    setTimeout(function() {
        startLoad(bruh);
    }, 200);
});

// IPCMAIN HANDLER
// ipcMain.handle("to-main", (event, data) => {
        
// });
// END IPCMAIN HANDLER