const config = require("../../config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(
    process.env.MONGODB_URI || config.connectionString,
    connectionOptions
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/User"),
  Book: require("../models/Book"),
  Category: require("../models/Category"),
  Marker: require("../models/Marker"),
};
