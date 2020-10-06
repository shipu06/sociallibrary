const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const Book = require("../models/Book");
const userService = require("../users/user.service.js");

router.post("/", getBooks);
router.post("/add", createBook);
router.get("/user", getUserBooks);
router.delete("/delete", removeBook);

async function createBook(req, res) {
  const _book = req.body;
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

async function removeBook(req, res) {
  const { bookId } = req.body;
  const userId = req.user.sub;

  if (!isObjectIDvalid(bookId))
    return res.json({ message: "BookID is not valid!", isSaved: false });

  const book = await Book.findById(ObjectID(bookId)).exec();
  if (!book)
    return res.json({ message: "Book does not exist!", isSaved: false });


  if (userId !== book.addedById)
    return res.json({
      message: "Book was not created by you!",
      isSaved: false,
    });

  book.remove((err, obj) => {
    if (err) return res.json({ message: err.message, isSaved: false });
    res.json({ message: "Book removed!", isSaved: true });
  });
}

module.exports = router;
