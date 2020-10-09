const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const User = require("../models/User.js");
const Book = require("../models/Book");
const Comment = require("../models/Comment");

router.post("/get", getBookComments);
router.post("/", createBookComment);
// router.delete("/", deleteMarker);

async function getBookComments(req, res) {
  const { bookId } = req.body;

  const commentsForSpecyficBook = await Comment.find({
    bookId: ObjectID(bookId),
  }).sort({ createdAt: -1 });

  const commentsWithUserData = await Promise.all(
    commentsForSpecyficBook.map(async function (comment) {
      const user = await User.findById(ObjectID(comment.userId)).exec();
      const name = `${user.firstName} ${user.lastName}`;
      return { comment, user, name };
    })
  );

  res.json(commentsWithUserData);
}

async function createBookComment(req, res) {
  const { text, bookId } = req.body;
  const userId = req.user.sub;
  if (!isObjectIDvalid(bookId))
    return res.json({ message: "BookID is not valid!", isSaved: false });

  const book = await Book.findById(ObjectID(bookId)).exec();
  if (!book)
    return res.json({ message: "Book does not exist!", isSaved: false });

  //   const _marker = await Marker.findOne({
  //     userId,
  //     bookId,
  //   });
  //   if (_marker)
  //     return res.json({ message: "Marker already in database!", isSaved: false });

  const comment = new Comment({ userId, bookId, text });

  comment.save(function (err, obj) {
    if (err) return res.json({ message: err.message, isSaved: false });

    res.json({ message: "Comment created!", isSaved: true });
  });
}

// async function deleteMarker(req, res) {
//   const { bookId } = req.body;
//   const userId = req.user.sub;

//   if (!isObjectIDvalid(bookId))
//     return res.json({ message: "BookID is not valid!", isSaved: false });

//   const book = await Book.findById(ObjectID(bookId)).exec();
//   if (!book)
//     return res.json({ message: "Book does not exist!", isSaved: false });

//   const marker = await Marker.findOne({
//     userId,
//     bookId,
//   });
//   if (!marker)
//     return res.json({ message: "Marker is not in database!", isSaved: false });

//   marker.remove((err, obj) => {
//     if (err) return res.json({ message: err.message, isSaved: false });

//     res.json({ message: "Marker deleted!", isSaved: true });
//   });
// }

module.exports = router;
