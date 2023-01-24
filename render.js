let loadingChecklistCount = 0;
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
    loadingChecklistCount++; //1
  });
}
// END USER DATA CALLS

// function sendData() {
//     electronAPI.send("to-main", true);
// }

//COLOR FUNCTION
function getColor(value){
  //value from 0 to 1
  let hue =((value)*120).toString(10);
  return ["hsl(",hue,",100%,50%)"].join("");
}

// LIVE FRONTEND UPDATES
electronAPI.recieve("start-load", (data) => {
    getOpponentData(data);
});

electronAPI.recieve("opponent-nametag", (data) => {
    nametagArray = data.split("#");
    nametagArray[1] = "#" + nametagArray[1];
    document.getElementById("opponent-nametag").innerText = nametagArray[0];
    document.getElementById("opponent-number").innerText = nametagArray[1];
    loadingChecklistCount++; //2
});

electronAPI.recieve("opponent-displayname", (data) => {
    document.getElementById("opponent-displayname").innerText = data;
    loadingChecklistCount++; //3
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
  async function applyRankImage() {
    document.getElementById("opponent-rank-icon").setAttribute("data", path);
    document.getElementById("opponent-rank-name").innerText = data;
  }
  applyRankImage().then(
    loadingChecklistCount++ //4
  );
});

electronAPI.recieve("opponent-stats", (data) => {
  let opponentWinrate = ((data.wins / (data.wins + data.losses)) * 100).toFixed(2);
  let opponentRating = data.rating.toFixed(2);
  document.getElementById("opponent-rating").innerText = opponentRating;
  document.getElementById("opponent-winrate").innerText = "" + opponentWinrate + "%";
  if(opponentWinrate >= 55) {
    document.getElementById("opponent-winrate").style.color = "green";
  } else if (opponentWinrate <= 45) {
    document.getElementById("opponent-winrate").style.color = "red";
  } else {
    document.getElementById("opponent-winrate").style.color = getColor(((opponentWinrate - 45) * (1 - 0)) / (55 - 45) + 0);
  }
  document.getElementById("opponent-wins").innerText = data.wins;
  document.getElementById("opponent-losses").innerText = data.losses;
  loadingChecklistCount++; //5
});

electronAPI.recieve("toggle-hidden", (data) => {
  let hiddenList = document.querySelectorAll('[id=hidden-on-start]');
  let i = data;
  function toggleHidden() {
    setTimeout(() => {
      hiddenList[i].classList.toggle("hidden");
      i++;
      if(i < hiddenList.length) {
        toggleHidden();
      }
    }, 50);
  }
  function loadingChecklistCountCheck() {
    if(loadingChecklistCount == 5) {
      toggleHidden();
    } else {
      setTimeout(() => {
        loadingChecklistCountCheck();
      }, 100);
    }
  }
  loadingChecklistCountCheck();
});
// END LIVE FRONTEND UPDATES

