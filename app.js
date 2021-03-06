require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const isValidHostname = require("is-valid-hostname");
const { uuid } = require("uuidv4");
const DataBase = require("./databaseClass");

const db = new DataBase("./DataBase/database.json");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.use("/public", express.static(`./public`));

// isUrlValid(url) {
//   var res = url.match(
//     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
//   );
//   if (res == null) return false;
//   else return true;
// }

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/shorturl/:shortUrl", (req, res) => {
  db.getById(req, res);
});

app.post("/DataBase/database.json", (req, res) => {
  const id = uuid();
  console.log(process.env.DATABASE);
  db.postInData(req, res, id);
});

module.exports = app;
