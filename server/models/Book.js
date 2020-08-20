const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    id: Number,
    name: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    pages: Number,
    year: Number,

    image: String,
    rating: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema, "books");

module.exports = Book;
