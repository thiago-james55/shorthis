var inputLogin = document.getElementById("inputLogin");
var inputPassword = document.getElementById("inputPassword");
var buttonLogin = document.getElementById("buttonLogin");
var userControllerLogin = "http://localhost:8080/shorthis/users/login";

addListerners();

function addListerners() {
  buttonLogin.addEventListener("click", () => {
    loginAccount();
  });
}

function loginAccount() {
  let loginUser = {
    login: inputLogin.value,
    nonHashPassword: inputPassword.value,
  };
  postLoginUser(loginUser)
    .then((response) => beginWithResponse(response))
    .catch((error) => showToasty(error));
}

async function postLoginUser(data = {}) {
  const response = await fetch(userControllerLogin, {
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

  if (response.status !== 400 && response.status !== 404) {
    json = response;
    createSessionFromLogin(json);
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

function createSessionFromLogin(userDto) {
  toastyMessage.style.backgroundColor = "green";
  showToasty("User " + userDto.login + " successfully logged!");

  setTimeout(function () {
    sessionStorage.setItem("login", userDto.login);
    window.location.href = "/index.html";
  }, 3000);
}

function isLogedIn() {
  let login = sessionStorage.getItem("login");

  if (login) {
    window.location.href = "/index.html";
  }
}

isLogedIn();

document.body.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    buttonLogin.click();
  }
});
