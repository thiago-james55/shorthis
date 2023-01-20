var enterLinkinput = document.getElementById("enterlink");
var submitButton = document.getElementById("submit");
var toastyMessageDiv = document.getElementById("toastyMessage");
var shortUrlController = "http://localhost:8080/shorthis/shortedurls/";
var login = sessionStorage.getItem("login");

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
      
    saveShort(enterLinkinput.value,login);
  });

}


async function saveShort(url, userLogin) {
  let post;

  if ( (!userLogin) || (userLogin == undefined)  ) {
    post = postSaveShort({ url: url })
      .then((response) => beginWithResponse(response))
      .catch((error) => showToasty(error));
  } else {
    post = postSaveShort({
      url: url,
      user: { login: userLogin },
    })
      .then((response) => beginWithResponse(response))
      .catch((error) => showToasty(error));
  }
}

async function postSaveShort(data = {}) {
  const response = await fetch(shortUrlController, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

function beginWithResponse(response) {
  let json;

  if (response.status !== 400) {
    json = response;

    window.location.href = "/success.html?key=" + json.shortKey;
  } else {
    throw new Error(response.title);
  }
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

  if (login) {
    loggedPanel();
    document.getElementById("info").innerHTML = "Enter the link below to short"
  }


}

function loggedPanel() {
  document.getElementById("aUserInformation").hidden = false;
  document.getElementById("aUserInformation").innerHTML = login;
  document.getElementById("aLogin").hidden = true;
  document.getElementById("aSignUp").hidden = true;
}

document.body.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    submitButton.click();
  }
});

isLogedIn();
addListerners();