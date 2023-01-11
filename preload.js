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
        recieve: (channel) => {
            ipcRenderer.once(channel, function (event, data) {
                console.log("Data: ", data);
            });
        }
    }
);