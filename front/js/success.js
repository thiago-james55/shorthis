import {
  beginWithResponse,
  getShortByShortKey,
  isLogedIn,
  loggedPanel,
  server,
  showToasty,
} from "./utils.js";

const shortKey = new URLSearchParams(window.location.search).get("key");
var inputOfYourLink = document.getElementById("yourLink");
var copyLinkButton = document.getElementById("copyButton");

function changeLoggedUserGeneratedInfo() {
  if (isLogedIn()) {
    loggedPanel();
    document.getElementById("info").innerHTML =
      "You successfully generated your Short!";
  }
}

function fill() {
  inputOfYourLink.value = server + shortKey;

  toastyMessage.style.backgroundColor = "green";
  showToasty("You successfully generated your Short!");

  copyLinkButton.addEventListener("click", () => {
    var copyText = document.getElementById("yourLink");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    showToasty("Link copied to clipboard: " + copyText.value);
  });
}

function checkShortKeyExistsAndFillIfExists() {
  if (shortKey && shortKey != null) {
    getShortByShortKey(shortKey)
      .then((response) => beginWithResponse(response, fill))
      .catch((error) => showToasty(error));
  } else {
    showToasty("ShortKey must be valid!");
  }
}

changeLoggedUserGeneratedInfo();
checkShortKeyExistsAndFillIfExists();
