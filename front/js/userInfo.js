import {
  beginWithResponse,
  getUserByLogin,
  isLogedIn,
  loggedPanel,
  login,
  putUpdateUser,
  showToasty,
} from "./utils.js";

var inputName = document.getElementById("inputName");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputConfirmPassword = document.getElementById("inputConfirmPassword");
var pPasswordWeakness = document.getElementById("pPasswordWeakness");
var buttonSignUp = document.getElementById("buttonSignUp");
var passwordConfirmed;

var buttonEditUserName = document.getElementById("buttonEditUserName");
var buttonEditUserEmail = document.getElementById("buttonEditUserEmail");
var buttonEditUserPassword = document.getElementById("buttonEditUserPassword");
var buttonEditUserConfirmPassword = document.getElementById(
  "buttonEditUserConfirmPassword"
);
var buttonSaveChanges = document.getElementById("buttonSaveChanges");
var buttonSignUp = document.getElementById("buttonSignOut");

function addListerners() {
  inputPassword.addEventListener("keyup", () => {
    passwordChanged();
  });
  inputConfirmPassword.addEventListener("keyup", () => {
    checkPasswordIsEquals();
  });
  buttonEditUserName.addEventListener("click", () => unlockEditField("name"));
  buttonEditUserEmail.addEventListener("click", () => unlockEditField("email"));
  buttonEditUserPassword.addEventListener("click", () =>
    unlockEditField("password")
  );
  buttonSaveChanges.addEventListener("click", () => saveUserChanges());
  buttonSignUp.addEventListener("click", () => signUp());
}

function passwordChanged() {
  var weakness = document.getElementById("pPasswordWeakness");
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
    weakness.innerHTML = "Password Weakness: Type Password";
  } else if (false == enoughRegex.test(pwd.value)) {
    weakness.innerHTML = "Password Weakness: Length must be greater than 7";
  } else if (strongRegex.test(pwd.value)) {
    weakness.innerHTML =
      '<p style="color:green">Password Weakness: Strong!</p>';
  } else if (mediumRegex.test(pwd.value)) {
    weakness.innerHTML =
      '<p style="color:orange">Password Weakness: Medium!</p>';
  } else {
    weakness.innerHTML = '<p style="color:red">Password Weakness: Weak!</p>';
  }

  checkPasswordIsEquals();
}

function checkPasswordIsEquals() {
  if (!inputPassword.disabled) {
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
    } else {
      passwordConfirmed = false;
    }
  } else {
    passwordConfirmed = true;
    return true;
  }
}

function checkUserData() {
  let userFillData = false;

  if (!inputName.disabled) {
    userFillData = inputName.value.length > 5;
  }

  if (!inputEmail.disabled) {
    userFillData = inputEmail.value.length > 5;
  }

  if (!inputPassword.disabled) {
    if (passwordConfirmed) {
      userFillData = true;
    } else {
      showToasty("Password must be valid!");
      return;
    }
  }

  if (userFillData) {
    if (passwordConfirmed || passwordConfirmed == undefined) {
      return true;
    } else {
      showToasty("Password must be valid!");
    }
  } else {
    showToasty("The fields length must be greater than 5!");
  }
}

function unlockEditField(input) {
  buttonSaveChanges.hidden = false;

  switch (input) {
    case "name":
      inputName.disabled = false;
      buttonEditUserName.disabled = true;
      buttonEditUserName.innerHTML = "Name";
      break;
    case "email":
      inputEmail.disabled = false;
      buttonEditUserEmail.disabled = true;
      buttonEditUserEmail.innerHTML = "Email";
      break;
    case "password":
      inputPassword.disabled = false;
      inputPassword.value = "";
      inputConfirmPassword.type = "password";
      pPasswordWeakness.hidden = false;
      buttonEditUserPassword.disabled = true;
      buttonEditUserPassword.innerHTML = "Password";
      buttonEditUserConfirmPassword.disabled = true;
      buttonEditUserConfirmPassword.hidden = false;
      buttonEditUserConfirmPassword.innerHTML = "Confirm";
      break;
  }
}

function getUserEditedData() {
  let userUpdate = {};

  userUpdate.login = login;
  if (!inputName.disabled) {
    userUpdate.name = inputName.value;
  }
  if (!inputEmail.disabled) {
    userUpdate.email = inputEmail.value;
  }
  if (!inputPassword.disabled) {
    userUpdate.nonHashPassword = inputPassword.value;
  }
  return userUpdate;
}

function saveUserChanges() {
  if (checkUserData()) {
    let userUpdate = getUserEditedData();
    editAccount(userUpdate);
  }
}

function editAccount(validUser) {
  putUpdateUser(validUser)
    .then((response) =>
      beginWithResponse(response, function () {
        showToasty("User succesfully updated!");
        setTimeout(function () {
          location.reload();
        }, 3000);
      })
    )
    .catch((error) => showToasty(error));
}

function signUp() {
  sessionStorage.removeItem("login");
  showToasty("Successfully Signed Out!");
  setTimeout(function () {
    window.location.href = "/index.html";
  }, 2000);
}

function loadUserInfo(UserJson) {
  inputName.value = UserJson.name;
  inputLogin.value = UserJson.login;
  inputEmail.value = UserJson.email;
  inputPassword.value = "**********";
}

function ifLoggedRequestAndFillData() {
  if (isLogedIn()) {
    loggedPanel();

    getUserByLogin(login)
      .then((response) => {
        beginWithResponse(response, loadUserInfo);
      })
      .catch((error) => showToasty(error));
  } else {
    window.location.href = "/index.html";
  }
}

ifLoggedRequestAndFillData();
addListerners();
