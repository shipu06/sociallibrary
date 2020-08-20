import { URL_API } from "./URL_API.js";

export function addBookToDatabase(book, cb) {
  fetch(URL_API.addBook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
