const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  category: { type: String, required: true },
});

const Book = mongoose.model("Category", BookSchema, "categories");

module.exports = Book;
