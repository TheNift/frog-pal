// USER DATA CALLS
async function requestOpponentData(nametag) {
    let nametagArray = nametag.toLowerCase().split("#");
    return new Promise(resolve => {
      setTimeout(() => {
        const response = fetch(`http://slprank.com/rank/${nametagArray[0]}-${nametagArray[1]}?raw`);
        resolve(response);
      }, 2000);
    });
}

async function prepRequestOpponentData(nametag) {
    const response = await requestOpponentData(nametag);
    const opponentDataJSON = await response.json();
    return opponentDataJSON;
}

const getOpponentData = (nametag) => {
  prepRequestOpponentData(nametag).then(response => {
    electronAPI.send("opponent-data", response);
  });
}
// END USER DATA CALLS

// function sendData() {
//     electronAPI.send("to-main", true);
// }

// LIVE FRONTEND UPDATES
electronAPI.recieve("start-load", (data) => {
    getOpponentData(data);
});

electronAPI.recieve("opponent-nametag", (data) => {
    nametagArray = data.split("#");
    nametagArray[1] = "#" + nametagArray[1];
    document.getElementById("opponent-nametag").innerText = nametagArray[0];
    document.getElementById("opponent-number").innerText = nametagArray[1];
});

electronAPI.recieve("opponent-displayname", (data) => {
    document.getElementById("opponent-displayname").innerText = data;
});

electronAPI.recieve("opponent-rank", (data) => {
  let rankName;
  if(data == "Grandmaster") {
    rankName = "rank_" + data.toLowerCase();
  } else {
    let rankNameArray = data.toLowerCase().split(" ");
    rankName = "rank_" + rankNameArray[0].concat("_", rankNameArray[1]);
  }
  let path = "assets/" + rankName + ".svg"
  document.getElementById("opponent-rank-icon").setAttribute("data", path);
  document.getElementById("opponent-rank-name").innerText = data;
});

electronAPI.recieve("opponent-stats", (data) => {
  document.getElementById("opponent-stats-wrapper").classList.remove("hidden");
  // document.getElementById("opponent-stats-wrapper").style.flexDirection = "column";
  // document.getElementById("opponent-stats-wrapper").style.alignItems = "center";
  document.getElementById("opponent-rating").innerText = data.rating;
  document.getElementById("opponent-winrate").innerText = "" + ((data.wins / (data.wins + data.losses)) * 100).toFixed(2) + "%";
});
// END LIVE FRONTEND UPDATES

