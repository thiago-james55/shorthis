import {
  beginWithResponse,
  deleteShort,
  isLogedIn,
  loggedPanel,
  login,
  patchUpdateShort,
  searchShortsByUser,
  showToasty,
} from "./utils.js";

var tableLinks = document.getElementById("linksTable");
var pModalKey = document.getElementById("pModalKey");
var aModalUrl = document.getElementById("aModalUrl");
var divDeleteModal = document.getElementById("divDeleteModal");
var buttonModalDelete = document.getElementById("buttonModalDelete");

function redirectIfNotLogged() {
  if (isLogedIn()) {
    loggedPanel();
  } else {
    showToasty("You must be logged in to see your shorts!");
    setTimeout(function () {
      window.location.href = "/login.html";
    }, 3000);
  }
}

function fillTable(jsonData) {
  clearTableData();

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
  let cellEdit = row.insertCell();
  let cellDelete = row.insertCell();

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

  let buttonEdit = document.createElement("button");
  buttonEdit.textContent = "✎";
  buttonEdit.id = "buttonEdit";
  buttonEdit.rowIndex = row.rowIndex;

  buttonEdit.addEventListener("click", function (e) {
    transformRowToEdit(e);
  });

  let buttonDelete = document.createElement("button");
  buttonDelete.textContent = "🗑";
  buttonDelete.id = "buttonDelete";
  buttonDelete.rowIndex = row.rowIndex;
  buttonDelete.addEventListener("click", function (e) {
    displayDeleteShortModal(e);
  });

  cellShortKey.appendChild(pShortKey);
  cellURL.appendChild(aURL);
  cellEdit.appendChild(buttonEdit);
  cellDelete.appendChild(buttonDelete);
}

function transformRowToEdit(e) {
  let row = tableLinks.rows[e.target.rowIndex];
  let shortKey = row.cells[0].children[0].innerHTML;

  if (e.target.textContent != "Save") {
    let oldUrl = row.cells[1].children[0].href;

    let inputUrl = document.createElement("input");
    inputUrl.value = oldUrl;
    inputUrl.style.width = "100%";
    inputUrl.style.textAlign = "center";

    row.cells[1].appendChild(inputUrl);
    row.cells[1].removeChild(row.cells[1].children[0]);

    e.target.textContent = "Save";
  } else {
    let newUrl = row.cells[1].children[0].value;

    let patchedShortedURL = {
      shortKey: shortKey,
      url: newUrl,
      user: { login: login },
    };

    saveEditedShort(patchedShortedURL);
  }
}

function displayDeleteShortModal(e) {
  divDeleteModal.style.display = "block";

  let row = tableLinks.rows[e.target.rowIndex];
  let shortKey = row.cells[0].children[0].innerHTML;

  pModalKey.textContent = "Key: " + shortKey;

  let url = row.cells[1].children[0].href;
  aModalUrl.href = url;
  if (url.toString().length > 70) {
    aModalUrl.textContent = url.substring(0, 70) + "...?";
  } else {
    aModalUrl.textContent = url;
  }
  aModalUrl.title = url;

  let deleteShortedURL = {
    shortKey: shortKey,
    url: url.toString(),
    user: { login: login },
  };

  buttonModalDelete.addEventListener("click", function (e) {
    deleteShort(deleteShortedURL)
      .then((response) => {
        beginWithResponse(response, getUserShorts);
        divDeleteModal.style.display = "none";
        showToasty(
          "ShortKey: (" + deleteShortedURL.shortKey + ") successfully deleted!"
        );
      })
      .catch((error) => showToasty(error));
  });
}

function saveEditedShort(patchedShortedURL) {
  patchUpdateShort(patchedShortedURL)
    .then((response) => {
      beginWithResponse(response, getUserShorts);
      showToasty(
        "ShortKey: (" + patchedShortedURL.shortKey + ") successfully edited!"
      );
    })
    .catch((error) => showToasty(error));
}

function getUserShorts() {
  searchShortsByUser(login)
    .then((response) => beginWithResponse(response, fillTable))
    .catch((error) => showToasty(error));
}

redirectIfNotLogged();
getUserShorts();
