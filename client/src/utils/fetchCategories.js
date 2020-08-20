import { URL_API } from "./URL_API.js";

function get(cb) {
  fetch(URL_API.getCategories)
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function add(cat, cb) {
  fetch(URL_API.addCategories, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: cat }),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

function remove(id, cb) {
  fetch(URL_API.removeCategories, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

export default { get, add, remove };
