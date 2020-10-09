const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const BookRating = require("../models/BookRating");

router.post("/", setBookRating);
router.get("/:bookId", getAverageBookRate);
router.get("/user/:bookId", getBookUserRate);

async function setBookRating(req, res) {
  const { bookId, value } = req.body;
  const userId = req.user.sub;

  if (!isObjectIDvalid(bookId))
    return res.json({ message: "CommentID is not valid!", isSaved: false });

  const ratingInDatabase = await BookRating.findOne({
    userId,
    bookId,
  });

  if (ratingInDatabase) {
    ratingInDatabase.value = value;
    ratingInDatabase.save(function (err, obj) {
      if (err) return res.json({ message: err.message, isSaved: false });
      res.json({ message: "Book Rating updated!", isSaved: true });
    });
  } else {
    const commentRating = new BookRating({ userId, bookId, value });
    commentRating.save(function (err, obj) {
      if (err) return res.json({ message: err.message, isSaved: false });
      res.json({ message: "Book Rate created!", isSaved: true });
    });
  }
}

async function getAverageBookRate(req, res) {
  const { bookId } = req.params;

  if (!isObjectIDvalid(bookId))
    return res.json({ message: "CommentID is not valid!", isSaved: false });

  const bookRatings = await BookRating.find({
    bookId,
  });

  if (!bookRatings.length) return res.json({ value: 0 });

  const value = (
    bookRatings.reduce((acc, { value }) => {
      return acc + value;
    }, 0) / bookRatings.length
  ).toFixed(2);
  return res.json({ value, quantity: bookRatings.length });
}

async function getBookUserRate(req, res) {
  const { bookId } = req.params;
  const userId = req.user.sub;
  if (!isObjectIDvalid(bookId))
    return res.json({
      message: "CommentID is not valid!",
      isSaved: false,
      isFound: false,
    });

  const bookRating = await BookRating.findOne({
    userId,
    bookId,
  });

  if (bookRating)
    return res.json({
      value: bookRating.value,
      isFound: true,
    });
  return res.json({ isFound: false });
}

module.exports = router;
