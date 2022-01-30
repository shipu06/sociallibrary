const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./_helpers/error-handler");
const path = require("path");
const responseTime = require("response-time");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  responseTime((req, res, time) => {
    console.log(`${req.method} TIME: ${(time / 1000).toFixed(3)}s`);
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api/flat", require("./controllers/flat.controller"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
