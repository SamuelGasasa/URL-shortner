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
app.use("/", express.static("Database"));

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/shorturl/:shortUrl", (req, res) => {
  db.getById(req, res);
});

app.get("/api/statistic/:shorturlId", (req, res) => {
  db.getStats(req, res);
});

app.post("/DataBase/database.json", (req, res) => {
  const id = uuid();
  db.postInData(req, res, id);
});

module.exports = app;
