const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: Number,
  name: { type: String, required: true },
  category: { type: Array, required: true },
  img: String,
  description: String,
  quantity: Number,
  isAvailable: Boolean,
});

const Book = mongoose.model("Book", BookSchema, "books");

module.exports = Book;
