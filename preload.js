const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'electronAPI', {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["opponent-data","user-data","toggle-active"];
            if (validChannels.includes(channel)) {
                ipcRenderer.invoke(channel, data);
            }
        },
        recieve: (channel, func) => {
            // whitelist channels
            let validChannels = ["start-load","opponent-nametag","opponent-displayname","opponent-rank","opponent-stats","render-user-data","toggle-hidden"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
    }
);