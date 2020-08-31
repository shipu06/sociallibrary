const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const ObjectID = require("mongodb").ObjectID;
const userService = require("../users/user.service.js");
const mongoose = require("mongoose");

// https://github.com/cornflourblue/node-mongo-registration-login-api

router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/", deleteCategory);

async function createCategory(req, res) {
  const _category = req.body;

  const user = await userService.getById(req.user.sub);
  console.log(user);
  if (!(user.userType === 1))
    return res.json({
      message: "You are not allowed to create category!",
      isSaved: false,
    });

  const category = new Category(_category);
  category.save(function (err, obj) {
    if (err) return res.json({ message: err.message, isSaved: false });

    res.json({ message: "Category created!", isSaved: true });
  });
}

async function deleteCategory(req, res) {
  const user = await userService.getById(req.user.sub);
  console.log(user);
  if (!(user.userType === 1))
    return res.json({
      message: "You are not allowed to delete category!",
      isSaved: false,
    });

  try {
    const { id } = req.body;
    await Category.deleteOne({ _id: ObjectID(id) });
    res.json({ message: `Category deleted!` });
  } catch (err) {
    res.json({ message: err });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
}
module.exports = router;
