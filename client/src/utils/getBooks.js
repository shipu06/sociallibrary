import { URL_API } from "./URL_API.js";

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
