const bruh = "Geoff";

function sendData() {
    electronAPI.send("to-main", bruh);
};

electronAPI.recieve("from-main", (event, data) => {
    console.log("Data: ", data);
});