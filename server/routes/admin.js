const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Category = require("../models/Category");
const ObjectID = require("mongodb").ObjectID;

router.post("/addBook", (req, res) => {
  const receivedBook = req.body;

  const book = new Book(receivedBook);
  book.save(function (err, obj) {
    if (err) return res.json({ message: err.message, isSaved: false });

    res.json({ message: "Book created!", isSaved: true });
  });
});

router.post("/categories", (req, res) => {
  const _category = req.body;

  const category = new Category(_category);
  category.save(function (err, obj) {
    if (err) return res.json({ message: err.message, isSaved: false });

    res.json({ message: "Category created!", isSaved: true });
  });
});

router.delete("/categories", async (req, res) => {
  try {
    const { id } = req.body;
    await Category.deleteOne({ _id: ObjectID(id) });
    res.json({ message: `Category deleted!` });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
