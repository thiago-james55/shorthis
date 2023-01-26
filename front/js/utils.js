export const login = sessionStorage.getItem("login");

export const shortUrlController = "http://localhost:8080/shorthis/shortedurls/";
export const shortUrlControllerUserSearch =
  "http://localhost:8080/shorthis/shortedurls/user/";
export const userController = "http://localhost:8080/shorthis/users/";
export const userControllerLogin =
  "http://localhost:8080/shorthis/users/login/";
export const server = "http://localhost:8080/shorthis/";

export const toastyMessage = document.getElementById("toastyMessage");

export function beginWithResponse(response, pageFunction) {
  let json;

  if (response.status !== 400 && response.status !== 404) {
    json = response;
    pageFunction(json);
  } else {
    throw new Error(response.title);
  }
}

export function isLogedIn() {
  if (login !== null && login !== undefined) {
    return true;
  } else {
    return false;
  }
}

export function loggedPanel() {
  document.getElementById("aUserInformation").hidden = false;
  document.getElementById("aMyShorts").hidden = false;
  document.getElementById("aUserInformation").innerHTML = login;
  document.getElementById("aLogin").hidden = true;
  document.getElementById("aSignUp").hidden = true;
}

export async function getShortByShortKey(shortKey) {
  const response = await fetch(shortUrlController + shortKey + "/show", {
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

export async function getSearchLinks(shortKeyOrUrl) {
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

export async function getUserByLogin(login) {
  const response = await fetch(userController + login, {
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

export async function deleteShort(short) {
  const response = await fetch(shortUrlController, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(short),
  });
  return response;
}

export async function patchUpdateShort(short) {
  const response = await fetch(shortUrlController, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(short),
  });
  return response.json();
}

export async function postLoginUser(data) {
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

export async function postSaveShort(data) {
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

export async function postSaveUser(data) {
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

export async function putUpdateUser(data = {}) {
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

export async function searchShortsByUser(user) {
  const response = await fetch(shortUrlControllerUserSearch + user, {
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

export function showToasty(message) {
  toastyMessage.innerHTML = message;

  toastyMessage.className = "show";

  setTimeout(function () {
    toastyMessage.className = toastyMessage.className.replace("show", "");
  }, 3000);
}
