const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Book = require("../models/Book");
const Rent = require("../models/Rent");

const mongoose = require("mongoose");

const books = require("../assets/books.js");

//=================================
//             User
//=================================

router.get("/books", async (req, res) => {
  console.log("/books");
  const books = await Book.find();

  try {
    res.json(books);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/book/:id", async (req, res) => {
  console.log("/book/:id");
  const book = await Book.find({ id: req.params.id });

  try {
    res.json(book);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/test", async (req, res) => {
  console.log("/test");
  const books = await Book.find();
  newBook = {
    id: 3,
    name: "Alicja w krainie czarów",
    category: ["Przygodowe", "Fantastyka"],
    img: "https://o.ibuk.pl/okladki/230/b1/212348.jpg",
    description: "Bla bla bla bla bla",
    pages: 392,
    quantity: 5,
    isAvailable: true,
  };

  const book = new Book(newBook);
   book.save();
  // const product = new Product({ helo: "hello" });
  // product.save().then((res, err) => {
  //   console.log(product);
  // }).catch(err);
  // Book.find().then((data) => res.json(data));
  console.log(books);
  res.json(books);
});

router.get("/rent", async (req, res) => {
  console.log("/rent");
  const rents = await Rent.find();
  const newRent = {
    id: 0,
    date: "renttttttttttttt w krainie czarów",
    category: ["rerere", "Fantastyka"],
    img: "https://o.ibuk.pl/okladki/230/b1/212348.jpg",
    description: "Bla bla bla bla bla",
    pages: 392,
    quantity: 5,
    isAvailable: true,
  };

  const rent = new Rent(newRent);

  console.log(rent);
  res.json(rents);
});

module.exports = router;
