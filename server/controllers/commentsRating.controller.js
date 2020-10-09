const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const CommentRating = require("../models/CommentRating");

router.post("/", setCommentRating);
router.get("/:commentId", getCommentRating);
router.get("/user/:commentId", getUserCommentRate);

async function setCommentRating(req, res) {
  const { commentId, value } = req.body;
  const userId = req.user.sub;

  if (!isObjectIDvalid(commentId))
    return res.json({ message: "CommentID is not valid!", isSaved: false });

  const ratingInDatabase = await CommentRating.findOne({
    userId,
    commentId,
  });

  if (ratingInDatabase) {
    if (value === null) {
      ratingInDatabase.remove((err, obj) => {
        if (err) return res.json({ message: err.message, isSaved: false });
        res.json({ message: "Comment Rating deleted!", isSaved: true });
      });
    }

    if (value === "like" || value === "dislike") {
      ratingInDatabase.value = value;
      ratingInDatabase.save(function (err, obj) {
        if (err) return res.json({ message: err.message, isSaved: false });
        res.json({ message: "Comment Rating updated!", isSaved: true });
      });
    }
  } else {
    const commentRating = new CommentRating({ userId, commentId, value });
    commentRating.save(function (err, obj) {
      if (err) return res.json({ message: err.message, isSaved: false });
      res.json({ message: "Comment Rate created!", isSaved: true });
    });
  }
}

async function getCommentRating(req, res) {
  const { commentId } = req.params;

  if (!isObjectIDvalid(commentId))
    return res.json({ message: "CommentID is not valid!", isSaved: false });

  const commentRatings = await CommentRating.find({
    commentId,
  });

  const value = commentRatings.reduce((acc, { value }) => {
    if (value === "like") return acc + 1;
    if (value === "dislike") return acc - 1;
    return acc;
  }, 0);

  return res.json({ value });
}

async function getUserCommentRate(req, res) {
  const { commentId } = req.params;
  const userId = req.user.sub;

  if (!isObjectIDvalid(commentId))
    return res.json({ message: "CommentID is not valid!", isSaved: false });

  const commentRatings = await CommentRating.findOne({
    userId,
    commentId,
  });

  if (commentRatings) return res.json({ value: commentRatings.value });
  return res.json({ value: null });
}

module.exports = router;
