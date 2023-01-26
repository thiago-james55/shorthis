import {
  beginWithResponse,
  isLogedIn,
  loggedPanel,
  login,
  postSaveShort,
  showToasty,
} from "./utils.js";

var enterLinkinput = document.getElementById("enterlink");
var submitButton = document.getElementById("submit");

function addListerners() {
  enterLinkinput.addEventListener("keyup", function () {
    if (enterLinkinput.value.length > 5) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });

  submitButton.addEventListener("click", () => {
    //Add logic JWT
    saveShort(enterLinkinput.value);
  });
}

async function saveShort(url) {
  let post;

  if (isLogedIn()) {
    post = {
      url: url,
      user: { login: login },
    };

    postSaveShort(post)
      .then((response) =>
        beginWithResponse(response, function (response) {
          console.log(response);
          window.location.href = "/success.html?key=" + response.shortKey;
        })
      )
      .catch((error) => showToasty(error));
  } else {
    post = { url: url };

    postSaveShort(post)
      .then((response) =>
        beginWithResponse(response, function (response) {
          window.location.href = "/success.html?key=" + response.shortKey;
        })
      )
      .catch((error) => showToasty(error));
  }
}

function constructLoggedPanel() {
  if (isLogedIn()) {
    loggedPanel();
    document.getElementById("info").innerHTML = "Enter the link below to short";
  }
}

document.body.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    submitButton.click();
  }
});

constructLoggedPanel();
addListerners();
