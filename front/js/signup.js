var inputName = document.getElementById("inputName");
var inputLogin = document.getElementById("inputLogin");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputConfirmPassword = document.getElementById("inputConfirmPassword");
var pPasswordWeakness = document.getElementById("pPasswordWeakness");
var buttonSignUp = document.getElementById("buttonSignUp");
var passwordConfirmed;
var userController = "http://localhost:8080/shorthis/users";

addListerners();

function addListerners() {
    inputPassword.addEventListener("change", () => { passwordChanged() });
    inputConfirmPassword.addEventListener("change", () => { checkPasswordIsEquals() });
    buttonSignUp.addEventListener("click", () => { createAccount(); })    
}

function passwordChanged() {

    var weakness = document.getElementById("pPasswordWeakness");
    var strongRegex = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{8,}).*", "g");
    var pwd = document.getElementById("inputPassword");
    if (pwd.value.length == 0) {
        weakness.innerHTML = 'Password Weakness: Type Password';
    } else if (false == enoughRegex.test(pwd.value)) {
        weakness.innerHTML = 'Password Weakness: Length must be greater than 7';
    } else if (strongRegex.test(pwd.value)) {
        weakness.innerHTML = '<p style="color:green">Password Weakness: Strong!</p>';
    } else if (mediumRegex.test(pwd.value)) {
        weakness.innerHTML = '<p style="color:orange">Password Weakness: Medium!</p>';
    } else {
        weakness.innerHTML = '<p style="color:red">Password Weakness: Weak!</p>';
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
            nonHashPassword: inputPassword.value
        }
        postSaveUser(validUser)
        .then((response) => beginWithResponse(response))
        .catch((error) => showToasty(error));
    }

}

function checkUserData() {

    let userFillData = (inputName.value.length > 5) 
                    && (inputLogin.value.length  > 5) 
                    && (inputEmail.value.length > 5);

    if (userFillData) {

        if (passwordConfirmed) {
            return true;
        } else {
            showToasty("Password must be valid!")
        }

    } else {
        showToasty("The fields length must be greater than 5!")
    }

}

async function postSaveUser(data = {}) {
    const response = await fetch(userController, {
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
      createSessionFromSignUp(json);      
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

function createSessionFromSignUp(userDto) {

    toastyMessage.style.backgroundColor = "green";
    showToasty("User " + userDto.login + " successfully created!");

    setTimeout(function () {
        sessionStorage.setItem("login", userDto.login);
        window.location.href = "/index.html";
      }, 5000);
    
    
}
