import { URL_API } from "./URL_API.js";
import { authHeader } from "./authHeader";

export function addBookToDatabase(book, cb) {
  let headers = authHeader();
  fetch(URL_API.addBook, {
    method: "POST",
    headers,
    body: JSON.stringify(book),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}
