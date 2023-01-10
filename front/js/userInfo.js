var inputName = document.getElementById("inputName");
var inputLogin = document.getElementById("inputLogin");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputConfirmPassword = document.getElementById("inputConfirmPassword");
var pPasswordWeakness = document.getElementById("pPasswordWeakness");
var buttonSignUp = document.getElementById("buttonSignUp");
var passwordConfirmed;
var userController = "http://localhost:8080/shorthis/users";
var login = sessionStorage.getItem("login");

var buttonEditUserName = document.getElementById("buttonEditUserName");
var buttonEditUserLogin = document.getElementById("buttonEditUserLogin");
var buttonEditUserEmail = document.getElementById("buttonEditUserEmail");
var buttonEditUserPassword = document.getElementById("buttonEditUserPassword");
var buttonEditUserConfirmPassword = document.getElementById("buttonEditUserConfirmPassword");
var buttonSaveChanges = document.getElementById("buttonSaveChanges");
var buttonSignUp = document.getElementById("buttonSignOut");

addListerners();

function addListerners() {
    inputPassword.addEventListener("change", () => { passwordChanged() });
    inputConfirmPassword.addEventListener("change", () => { checkPasswordIsEquals() });
    buttonEditUserName.addEventListener("click", () => unlockEditField("name"));
    buttonEditUserLogin.addEventListener("click", () => unlockEditField("login"));
    buttonEditUserEmail.addEventListener("click", () => unlockEditField("email"));
    buttonEditUserPassword.addEventListener("click", () => unlockEditField("password"));
    buttonSaveChanges.addEventListener("click", () => saveUserChanges());
    buttonSignUp.addEventListener("click", () => signUp());
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

function editAccount() {

    if (checkUserData()) {
        let validUser = {
            login: inputLogin.value,
            name: inputName.value,
            email: inputEmail.value,
            nonHashPassword: inputPassword.value
        }
        putUpdateUser(validUser)
        .then((response) => beginWithResponse(response))
        .catch((error) => showToasty(error));
    }

}

function checkUserData() {

    let userFillData = false;

    if (!inputName.disabled) { userFillData = (inputName.value.length > 5); } 
    
    if (!inputLogin.disabled) { userFillData = (inputLogin.value.length > 5); } 
    
    if (!inputEmail.disabled) { userFillData = (inputEmail.value.length > 5); }

    if (!inputPassword.disabled) {

        if (passwordConfirmed) { 
            userFillData = true; 
        }  else {
            showToasty("Password must be valid!");
            return;
        }

    }

    if (userFillData) {

        if ( (passwordConfirmed) || (passwordConfirmed == undefined)) {
            return true;
        } else {
            showToasty("Password must be valid!")
        }

    } else {
        showToasty("The fields length must be greater than 5!")
    }

}

async function putUpdateUser(data = {}) {
    const response = await fetch(userController, {
      method: "PUT",
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
      loadUserInfo(json);
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


function unlockEditField(input) {
    
    buttonSaveChanges.hidden = false;

    switch(input) {
        case "name":
            inputName.disabled = false;
            buttonEditUserName.disabled = true;
            buttonEditUserName.innerHTML = "Name";
            break;
        case "login":
            inputLogin.disabled = false;
            buttonEditUserLogin.disabled = true;
            buttonEditUserLogin.innerHTML = "Login";
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

function saveUserChanges() {
    if (checkUserData()) {
        let userUpdate = getUserEditedData();
        console.log(userUpdate);
    }
}

function getUserEditedData() {

    let userUpdate = {};

    if (!inputName.disabled) { userUpdate.name = inputName.value; }
    if (!inputLogin.disabled) { userUpdate.login = inputLogin.value; }
    if (!inputEmail.disabled) { userUpdate.email = inputEmail.value; }
    if (!inputPassword.disabled) { userUpdate.nonHashPassword = inputPassword.value; }

    return JSON.stringify(userUpdate);
    
}

function signUp() {
    sessionStorage.removeItem("login");
    showToasty("Successfully Signed Out!");
    setTimeout(function () {
        window.location.href = "/index.html";
      }, 3000);
}

function loadUserInfo(UserJson) {
    inputName.value = UserJson.name;
    inputLogin.value = UserJson.login;
    inputEmail.value = UserJson.email;
    inputPassword.value = "**********";
}

async function getUserByLogin(login) {
    const response = await fetch(userController + "/" + login, {
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

function isLogedIn() {

    if (!login || login == undefined) { 

        window.location.href = "/index.html"; 

    } else {

        loggedPanel();

        getUserByLogin(login)
        .then((response) => {userInfo = beginWithResponse(response)})
        .catch((error) => showToasty(error));

    }
  
}

function loggedPanel() {
    document.getElementById("aUserInformation").hidden = false;
    document.getElementById("aUserInformation").innerHTML = login;
    document.getElementById("aLogin").hidden = true;
    document.getElementById("aSignUp").hidden = true;
}
  
isLogedIn();