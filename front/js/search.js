import {
  beginWithResponse,
  getSearchLinks,
  isLogedIn,
  loggedPanel,
  showToasty,
} from "./utils.js";

var inputlinkSearch = document.getElementById("linkSearch");
var buttonSearchLinks = document.getElementById("searchLinks");
var tableLinks = document.getElementById("linksTable");

buttonSearchLinks.addEventListener("click", () => searchLinks());

async function searchLinks() {
  let inputShortKeyOrUrl = inputlinkSearch.value;

  if (inputShortKeyOrUrl.length > 0) {
    getSearchLinks(inputShortKeyOrUrl)
      .then((response) => beginWithResponse(response, fillTable))
      .catch((error) => showToasty(error));
  } else {
    showToasty("The length of search must be greater than 0");
  }
}

function fillTable(jsonData) {
  tableLinks.hidden = false;

  clearTableData();

  showToasty(jsonData.length + " results found!");

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

function constructLoggedPanel() {
  if (isLogedIn()) {
    loggedPanel();
  }
}

constructLoggedPanel();
