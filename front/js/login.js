import {
  beginWithResponse,
  isLogedIn,
  postLoginUser,
  showToasty,
} from "./utils.js";

var inputLogin = document.getElementById("inputLogin");
var inputPassword = document.getElementById("inputPassword");
var buttonLogin = document.getElementById("buttonLogin");

function addListerners() {
  buttonLogin.addEventListener("click", () => {
    loginAccount();
  });
  document.body.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      buttonLogin.click();
    }
  });
}

function loginAccount() {
  let loginUser = {
    login: inputLogin.value,
    nonHashPassword: inputPassword.value,
  };
  postLoginUser(loginUser)
    .then((response) => beginWithResponse(response, createSessionFromLogin))
    .catch((error) => showToasty(error));
}

function createSessionFromLogin(userDto) {
  toastyMessage.style.backgroundColor = "green";
  showToasty("User " + userDto.login + " successfully logged!");

  setTimeout(function () {
    sessionStorage.setItem("login", userDto.login);
    window.location.href = "/index.html";
  }, 3000);
}

function redirectIfIsLogged() {
  if (isLogedIn()) {
    window.location.href = "/index.html";
  }
}

redirectIfIsLogged();
addListerners();
