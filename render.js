const bruh = "Geoff";

function sendData() {
    electronAPI.send("to-main", bruh);
}

electronAPI.recieve("from-main", (data) => {
    document.getElementById("opponent-name").innerText = data;
});

