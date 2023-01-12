const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'electronAPI', {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["opponent-data"];
            if (validChannels.includes(channel)) {
                ipcRenderer.invoke(channel, data);
            }
        },
        recieve: (channel, func) => {
            // whitelist channels
            let validChannels = ["opponent-nametag","opponent-displayname","start-load"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
    }
);