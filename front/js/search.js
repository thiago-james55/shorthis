var inputlinkSearch = document.getElementById("linkSearch");
var buttonSearchLinks = document.getElementById("searchLinks");
var tableLinks = document.getElementById("linksTable");
var toastyMessageDiv = document.getElementById("toastyMessage");
var shortUrlController = "http://localhost:8080/shorthis/shortedurls/";
var login = sessionStorage.getItem("login");

function addListerners() {
  buttonSearchLinks.addEventListener("click", () => searchLinks());
}

async function searchLinks() {
  let inputShortKeyOrUrl = inputlinkSearch.value;

  if (inputShortKeyOrUrl.length > 0) {
    getSearchLinks(inputShortKeyOrUrl)
      .then((response) => beginWithResponse(response))
      .catch((error) => showToasty(error));
  } else {
    showToasty("The length of search must be greater than 0");
  }
}

async function getSearchLinks(shortKeyOrUrl) {
  const response = await fetch(shortUrlController + shortKeyOrUrl + "/search", {
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

function beginWithResponse(response) {
  let json;

  if (response.status != 404) {
    fillTable(response);
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
  if (login && login != undefined) {
    loggedPanel();
  }
}

function loggedPanel() {
  document.getElementById("aUserInformation").hidden = false;
  document.getElementById("aUserInformation").innerHTML = login;
  document.getElementById("aLogin").hidden = true;
  document.getElementById("aSignUp").hidden = true;
}

function fillTable(jsonData) {
  tableLinks.hidden = false;
  
  clearTableData();
  
  showToasty(jsonData.length + " results found!")

  jsonData.forEach((shortedURL) => {
    addInfoToTable(shortedURL);
  });
}

function clearTableData() {
  var rowCount = tableLinks.rows.length;
  for (var i = 1; i < rowCount; i++) {
      tableLinks.deleteRow(1);
  }
}

function addInfoToTable(shortedURL) {
  let row = tableLinks.insertRow();
  let cellShortKey = row.insertCell();
  let cellURL = row.insertCell();
  let cellUser = row.insertCell();

  let pShortKey = document.createElement("p");
  pShortKey.textContent = shortedURL.shortKey;

  let aURL = document.createElement("a");
  aURL.href = shortedURL.url;
  if (shortedURL.url.length > 70) {
    aURL.textContent = shortedURL.url.substring(0, 70) + "...?";
  } else {
    aURL.textContent = shortedURL.url;
  }
  aURL.title = shortedURL.url;

  let pUser = document.createElement("p");
  pUser.textContent = shortedURL.user;

  cellShortKey.appendChild(pShortKey);
  cellURL.appendChild(aURL);
  cellUser.appendChild(pUser);
}

document.body.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    buttonSearchLinks.click();
  }
});


isLogedIn();
addListerners();
