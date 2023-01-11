const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'electronAPI', {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["to-main"];
            if (validChannels.includes(channel)) {
                ipcRenderer.invoke(channel, data);
            }
        },
        recieve: (channel, func) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        },
    }
);