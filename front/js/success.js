const server = "localhost:8080/shorthis/";
const shortKey = new URLSearchParams(window.location.search).get("key");
var inputOfYourLink = document.getElementById("yourLink");
var copyLinkButton = document.getElementById("copyButton");
var toastyMessageDiv = document.getElementById("toastyMessage");

function fill() {
  inputOfYourLink.value = shortKey;

  inputOfYourLink.value = server + shortKey;

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

fill();
