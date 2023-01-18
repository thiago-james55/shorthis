const shortUrlController = "http://localhost:8080/shorthis";
const server = "http://localhost:8080/shorthis/"
const shortKey = new URLSearchParams(window.location.search).get("key");
var inputOfYourLink = document.getElementById("yourLink");
var copyLinkButton = document.getElementById("copyButton");
var toastyMessageDiv = document.getElementById("toastyMessage");
var login = sessionStorage.getItem("login");

function fill() {

  inputOfYourLink.value = server + shortKey;

  toastyMessage.style.backgroundColor = "green";
  showToasty("You successfully generated your Short!")

  copyLinkButton.addEventListener("click", () => {
    var copyText = document.getElementById("yourLink");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    showToasty("Link copied to clipboard: " + copyText.value);
  });

  
}

function showToasty(message) {
  var toastyMessage = document.getElementById("toastyMessage");
  toastyMessage.innerHTML = message;

  toastyMessage.className = "show";

  setTimeout(function () {
    toastyMessage.className = toastyMessage.className.replace("show", "");
  }, 3000);
}

function isLogedIn() {

  if ((login) && (login != undefined)) {
    loggedPanel();
    document.getElementById("info").innerHTML = "You successfully generated your Short!";
  }

}

function loggedPanel() {
  document.getElementById("aUserInformation").hidden = false;
  document.getElementById("aUserInformation").innerHTML = login;
  document.getElementById("aLogin").hidden = true;
  document.getElementById("aSignUp").hidden = true;
}


function checkShortKeyExistsAndFillIfExists() {

  if ( (shortKey) && shortKey != null) {

  getShortByShortKey(shortKey)
    .then((response) => beginWithResponse(response))
    .catch((error) => showToasty(error));

  } else {
    showToasty("ShortKey must be valid!")
  }

}

async function getShortByShortKey(shortKey) {
  const response = await fetch(shortUrlController + "/" + shortKey + "/show", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

function beginWithResponse(response, update) {
  let json;

  if (response.status != 404) {
    json = response;
    fill();    
  } else {
    throw new Error(response.title);
  }
}


isLogedIn();
checkShortKeyExistsAndFillIfExists();

