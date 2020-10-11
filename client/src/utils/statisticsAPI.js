import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

function getBestBooks(cb) {
  let headers = authHeader();
  fetch(URL_API.getBestBooks, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      cb(res);
    });
}

function getLastBooks(cb) {
  let headers = authHeader();
  fetch(URL_API.getLastBooks, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function getMostPopular(cb) {
  let headers = authHeader();
  fetch(URL_API.getMostPopular, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
function getQuantityOfCategories(cb) {
  let headers = authHeader();
  fetch(URL_API.getQuantityOfCategories, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      cb(res);
    });
}
function getNumbers(cb) {
  let headers = authHeader();
  fetch(URL_API.getNumbers, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      cb(res);
    });
}

function create(bookId, cb) {
  let headers = authHeader();
  fetch(URL_API.createMarker, {
    method: "POST",
    headers,
    body: JSON.stringify({ bookId }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      cb(res);
    });
}
function remove(bookId, cb) {
  let headers = authHeader();
  fetch(URL_API.createMarker, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ bookId }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      cb(res);
    });
}

export default {
  getBestBooks,
  getLastBooks,
  getMostPopular,
  getQuantityOfCategories,
  getNumbers,
};
