require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const isValidHostname = require("is-valid-hostname");
// const db = require("databaseClass.js");

class DataBase {
  constructor(location) {
    this.db = JSON.parse(fs.readFileSync(location));
  }

  //   getDataBase() {
  //     const dataBase = fs.readFileSync("./DataBase/database.json");
  //     return JSON.parse(dataBase);
  //   }

  getById(req, res) {
    const { shortUrl } = req.params;
    const url = this.db.find((element) => element.id === shortUrl);
    if (url) {
      res.redirect(url.url);
    }
    res.send("<h1>No shortened url found in the database</h1>");
  }

  postInData(res, req) {
    this.db.push(body);
    fs.writeFileSync("./DataBase/database.json", JSON.stringify(db));
  }

  isExist(url) {
    if (this.db.find((element) => element.url === url)) {
      console.log("truth");
      return true;
    }
    console.log("false");
    return false;
  }

  isUrlValid(url) {
    const res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    if (res == null) return false;
    else return true;
  }
}
const db = new DataBase("./DataBase/database.json");

let ID = 0;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

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
  const db = new DataBase();
  const { body } = req;
  if (db.isExist(body.url)) {
    res.send("url already exist!");
  } else {
    if (isUrlValid(body.url)) {
      if (isValidHostname(body.url)) {
        body.id = 2;
        // ID += 1;
        // parseData.push(body);
        // fs.writeFile(
        //   "./DataBase/database.json",
        //   JSON.stringify(parseData, null, 4),
        //   (e) => {
        //     if (e) {
        //       console.log(e);
        //     }
        //   },
        // );
        db.postInData(body);
        res.send(body);
      }
      res.send("invalid hostname");
    }
    res.send("invalid url");
  }
});

// const test = new DataBase();
// test.readFile(testtest);
// console.log(crazy);
// console.log("should see it after");
module.exports = app;
