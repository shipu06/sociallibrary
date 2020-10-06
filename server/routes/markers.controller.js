const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
const userService = require("../users/user.service.js");
const mongoose = require("mongoose");
const Book = require("../models/Book");
const Marker = require("../models/Marker");
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

router.get("/user", getUserMarkers);
router.post("/", createMarker);
router.delete("/", deleteMarker);

async function getUserMarkers(req, res) {
  const markers = await Marker.find({ userId: req.user.sub });
  const bookIds = markers
    .map((m) => m.bookId)
    .filter((id) => isObjectIDvalid(id));
  const books = await Book.find({ _id: bookIds }).exec();
  res.json(books);
}

async function createMarker(req, res) {
  const { bookId } = req.body;
  const userId = req.user.sub;
  if (!isObjectIDvalid(bookId))
    return res.json({ message: "BookID is not valid!", isSaved: false });

  const book = await Book.findById(ObjectID(bookId)).exec();
  if (!book)
    return res.json({ message: "Book does not exist!", isSaved: false });

  const _marker = await Marker.findOne({
    userId,
    bookId,
  });
  if (_marker)
    return res.json({ message: "Marker already in database!", isSaved: false });

  const marker = new Marker({ userId, bookId });

  marker.save(function (err, obj) {
    if (err) return res.json({ message: err.message, isSaved: false });

    res.json({ message: "Marker created!", isSaved: true });
  });
}

async function deleteMarker(req, res) {
  const { bookId } = req.body;
  const userId = req.user.sub;

  if (!isObjectIDvalid(bookId))
    return res.json({ message: "BookID is not valid!", isSaved: false });

  const book = await Book.findById(ObjectID(bookId)).exec();
  if (!book)
    return res.json({ message: "Book does not exist!", isSaved: false });

  const marker = await Marker.findOne({
    userId,
    bookId,
  });
  if (!marker)
    return res.json({ message: "Marker is not in database!", isSaved: false });

  marker.remove((err, obj) => {
    if (err) return res.json({ message: err.message, isSaved: false });

    res.json({ message: "Marker deleted!", isSaved: true });
  });
}

module.exports = router;
