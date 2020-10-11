const express = require("express");
const router = express.Router();

const statisticsService = require("../services/statistics.service.js");

router.get("/bestBooks", getBestBook);
router.get("/lastBooks", getLastBooks);
router.get("/mostPopularBooks", getMostPopular);
router.get("/getQuantityOfCategories", getQuantityOfCategories);
router.get("/getNumbers", getNumbers);

function getBestBook(req, res) {
  statisticsService
    .getBestBooks(2)
    .then((books) => res.json(books))
    .catch((err) => res.json({ err }));
}
function getLastBooks(req, res) {
  statisticsService
    .getLastBooks(3)
    .then((books) => res.json(books))
    .catch((err) => res.json({}));
}

function getMostPopular(req, res) {
  statisticsService
    .getMostPopularBooks(5)
    .then((books) => {
      res.json(books);
    })
    .catch((err) => res.json({}));
}
function getQuantityOfCategories(req, res) {
  statisticsService
    .getQuantityOfCategories()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => res.json({}));
}
function getNumbers(req, res) {
  statisticsService
    .getNumbers()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => res.json({}));
}

module.exports = router;
