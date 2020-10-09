const mongoose = require("mongoose");
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const db = require("../_helpers/db");
const Marker = db.Marker;

const booksService = require("../services/books.service.js");

async function get(userId) {
  const markers = await Marker.find({ userId });

  const bookIds = markers
    .map((m) => m.bookId)
    .filter((id) => isObjectIDvalid(id));
  return await booksService.getBooksByIds(bookIds);
}

async function create(bookId, userId) {
  const book = await booksService.getBooksByIds(bookId);
  if (!book) return { message: "Book does not exist!", isSaved: false };

  const _marker = await Marker.findOne({
    userId,
    bookId,
  });
  if (_marker)
    return { message: "Marker already in database!", isSaved: false };

  const marker = new Marker({ userId, bookId });
  return await marker.save();
}

async function _delete(bookId, userId) {
  console.log(bookId);
  const [book] = await booksService.getBooksByIds(bookId);
  if (!book) throw new Error("Book does not exist!");

  const marker = await Marker.findOne({
    userId,
    bookId,
  });

  
  if (!marker) throw new Error("Marker is not in database!");

  return await marker.remove();
}

module.exports = { get, create, _delete };
