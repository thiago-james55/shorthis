import {
  beginWithResponse,
  isLogedIn,
  postSaveUser,
  showToasty,
  toastyMessage,
} from "./utils.js";

var inputName = document.getElementById("inputName");
var inputLogin = document.getElementById("inputLogin");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputConfirmPassword = document.getElementById("inputConfirmPassword");
var pPasswordWeakness = document.getElementById("pPasswordWeakness");
var buttonSignUp = document.getElementById("buttonSignUp");
var passwordConfirmed;

addListerners();

function addListerners() {
  inputPassword.addEventListener("keyup", () => {
    passwordChanged();
  });
  inputConfirmPassword.addEventListener("keyup", () => {
    checkPasswordIsEquals();
  });
  buttonSignUp.addEventListener("click", () => {
    createAccount();
  });

  document.body.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      buttonSignUp.click();
    }
  });
}

function passwordChanged() {
  var strongRegex = new RegExp(
    "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
    "g"
  );
  var mediumRegex = new RegExp(
    "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
    "g"
  );
  var enoughRegex = new RegExp("(?=.{8,}).*", "g");
  var pwd = document.getElementById("inputPassword");
  if (pwd.value.length == 0) {
    pPasswordWeakness.innerHTML = "Password Weakness: Type Password";
  } else if (false == enoughRegex.test(pwd.value)) {
    pPasswordWeakness.innerHTML =
      "Password Weakness: Length must be greater than 7";
  } else if (strongRegex.test(pwd.value)) {
    pPasswordWeakness.innerHTML =
      '<p style="color:green">Password Weakness: Strong!</p>';
  } else if (mediumRegex.test(pwd.value)) {
    pPasswordWeakness.innerHTML =
      '<p style="color:orange">Password Weakness: Medium!</p>';
  } else {
    pPasswordWeakness.innerHTML =
      '<p style="color:red">Password Weakness: Weak!</p>';
  }

  checkPasswordIsEquals();
}

function checkPasswordIsEquals() {
  if (inputPassword.value.length > 7) {
    if (inputPassword.value === inputConfirmPassword.value) {
      inputPassword.style.borderColor = "green";
      inputConfirmPassword.style.borderColor = "green";
      passwordConfirmed = true;
    } else {
      inputPassword.style.borderColor = "red";
      inputConfirmPassword.style.borderColor = "red";
      passwordConfirmed = false;
    }
  }
}

function createAccount() {
  if (checkUserData()) {
    let validUser = {
      login: inputLogin.value,
      name: inputName.value,
      email: inputEmail.value,
      nonHashPassword: inputPassword.value,
    };
    postSaveUser(validUser)
      .then((response) => beginWithResponse(response, createSessionFromSignUp))
      .catch((error) => showToasty(error));
  }
}

function checkUserData() {
  let userFillData =
    inputName.value.length > 5 &&
    inputLogin.value.length > 5 &&
    inputEmail.value.length > 5;

  if (userFillData) {
    if (passwordConfirmed) {
      return true;
    } else {
      showToasty("Password must be valid!");
    }
  } else {
    showToasty("The fields length must be greater than 5!");
  }
}

function createSessionFromSignUp(userDto) {
  toastyMessage.style.backgroundColor = "green";
  showToasty("User " + userDto.login + " successfully created!");

  setTimeout(function () {
    sessionStorage.setItem("login", userDto.login);
    window.location.href = "/index.html";
  }, 5000);
}

function redirectIfIsLogged() {
  if (isLogedIn()) {
    window.location.href = "/index.html";
  }
}

redirectIfIsLogged();
