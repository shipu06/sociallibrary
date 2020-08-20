const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Book = require("../models/Book");
const Rent = require("../models/Rent");
const Category = require("../models/Category");

const mongoose = require("mongoose");

const books = require("../assets/books.js");

//=================================
//             User
//=================================

router.post("/books", async (req, res) => {
  const { category, pages, year, sortBy, searchPhrase } = req.body;
  let options = [];

  if (searchPhrase) {
    const name = {
      $regex: searchPhrase,
      $options: "i",
    };
    const author = {
      $regex: searchPhrase,
      $options: "i",
    };
    const category = {
      $regex: searchPhrase,
      $options: "i",
    };
    options.push({ $or: [{ name }, { author }, { category }] });
  }

  if (category.length !== 0) options.push({ category: category });

  if (pages.length !== 0) {
    options.push({ pages: { $lt: pages[1], $gt: pages[0] } });
  }

  if (year.length !== 0) {
    options.push({ year: { $lt: year[1], $gt: year[0] } });
  }

  if (!options.length) options = [{}];
  console.log(options);

  try {
    const books = await Book.find({ $and: options }).sort(
      sortBy || { createdAt: -1 }
    );
    res.json(books);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
