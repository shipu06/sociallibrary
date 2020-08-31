import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

export default function getBooks(options, cb) {
  fetch(URL_API.getBooks, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

export function getUserBooks(cb) {
  let headers = authHeader();
  fetch(URL_API.getUserBooks, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
