const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentSchema = new Schema({
  id: Number,
  book: {
    id: Number,
    name: String,
    img: String,
  },
  info: {
    name: String,
    surname: String,
    email: String,
    telephone: Number,
    city: String,
    postcode: String,
    street: String,
  },
  date: String,
  status: String,
});

const Rent = mongoose.model("Rent", RentSchema, "rents");

module.exports = Rent;
