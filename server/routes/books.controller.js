const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const mongoose = require("mongoose");
const userService = require("../users/user.service.js");

router.post("/", getBooks);
router.post("/add", createBook);
router.get("/user", getUserBooks);

async function createBook(req, res) {
  const _book = req.body;
  console.log(_book);
  const user = await userService.getById(req.user.sub);

  _book.addedBy = `${user.firstName} ${user.lastName}`;
  _book.addedById = req.user.sub;

  const book = new Book(_book);

  book.save(function (err, obj) {
    if (err) return res.json({ message: err.message, isSaved: false });

    res.json({ message: "Book created!", isSaved: true });
  });
}
async function getBooks(req, res) {
  const { category, pages, year, sortBy, searchPhrase } = req.body;
  let options = [];
  if (searchPhrase) {
    const searchText = {
      $regex: searchPhrase,
      $options: "i",
    };
    options.push({
      $or: [
        { name: searchText },
        { author: searchText },
        { category: searchText },
        { addedBy: searchText },
      ],
    });
  }

  if (category.length) options.push({ category: category });
  if (pages.length) options.push({ pages: { $lt: pages[1], $gt: pages[0] } });
  if (year.length) options.push({ year: { $lt: year[1], $gt: year[0] } });
  if (!options.length) options = [{}];

  try {
    const books = await Book.find({ $and: options }).sort(
      sortBy || { createdAt: -1 }
    );
    res.json(books);
  } catch (err) {
    res.json({ message: err });
  }
}

async function getUserBooks(req, res) {
  try {
    const books = await Book.find({ addedById: req.user.sub }).sort({
      createdAt: -1,
    });
    res.json(books);
  } catch (err) {
    res.json({ message: err });
  }
}

module.exports = router;
