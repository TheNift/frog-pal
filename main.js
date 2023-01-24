const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');

// VARIABLES
let win;
let bruh = "IIII#143";
let bruh1 = "iBDW#0"
// END VARIABLES

// CREATE ELECTRON WINDOW
const createWindow = () => {
    win = new BrowserWindow({
        width: 300,
        height: 600,
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

function renderRank(rank) {
    win.webContents.send("opponent-rank", rank);
}

function renderStats(stats) {
    win.webContents.send("opponent-stats", stats);
}

function toggleHidden(int) {
    win.webContents.send("toggle-hidden", int);
}
// END DATA TO FRONTEND

app.whenReady().then(() => {
    ipcMain.handle("opponent-data", (event, data) => {
        renderNametag(bruh);
        renderDisplayName(data.displayName);
        renderRank(data.rank);
        renderStats(data);
        toggleHidden(0);
    });
    createWindow();
    setTimeout(function() {
        startLoad(bruh);
    }, 1000);
});

// IPCMAIN HANDLER
// ipcMain.handle("to-main", (event, data) => {
        
// });
// END IPCMAIN HANDLER