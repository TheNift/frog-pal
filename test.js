let isReady = false;
let opponentData;
const nametag = "IBDW#0";

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
    const response = await requestUser(nametag);
    const opponentDataJSON = await response.json()
    return opponentDataJSON;
}

const getOpponentData = (nametag) => {
  prepRequestOpponentData(nametag).then(response => {
    opponentData = response;
    isReady = true;
  });
};

getOpponentData(nametag);

function updateInfo() {
  if(isReady == true) {
    console.log(opponentData)
    document.getElementById("nametag-element").innerHTML = opponentData.displayName;
  }
}