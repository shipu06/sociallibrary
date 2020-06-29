const express = require("express");
const router = express.Router();
const rent = require("../assets/rented.js");

router.get("/rent", (req, res) => {
  console.log("/rent");

  res.json(rent);
});



module.exports = router;