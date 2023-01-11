const { contextBridge, ipcRenderer, ipcMain } = require('electron');

contextBridge.exposeInMainWorld(
    'electronAPI', {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["to-main"];
            if (validChannels.includes(channel)) {
                ipcRenderer.invoke(channel, data);
            }
        },
        receive: (channel, data) => {
            // whitelist channels
            let validChannels = ["from-main"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, data);
            }
        },
    }
);