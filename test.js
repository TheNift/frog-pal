let isReady = false;
let userData;

async function requestUser(userID) {
    let nametagArray = userID.toLowerCase().split("#");
    return new Promise(resolve => {
      setTimeout(() => {
        const response = fetch(`http://slprank.com/rank/${nametagArray[0]}-${nametagArray[1]}?raw`);
        resolve(response);
      }, 2000);
    });
}

async function wrapUser() {
    const UID = "IBDW#0";
    const response = await requestUser(UID);
    const userDataJSON = await response.json()
    return userDataJSON;
}

const prepUserData = () => {
    wrapUser().then(response => {
      userData = response;
      isReady = true;
    });
  };

prepUserData();

function updateInfo() {
  if(isReady == true) {
    console.log(userData)
    document.getElementById("nametag-element").innerHTML = userData.displayName;
  }
}