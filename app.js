require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const isValidHostname = require("is-valid-hostname");

let ID = 0;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/public", express.static(`./public`));

function isUrlValid(url) {
  var res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  if (res == null) return false;
  else return true;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/shorturl/:shortUrl", (req, res) => {
  const { shortUrl } = req.params;
  const db = new DataBase(req.body);
  const url = db.getById(shortUrl);
  if (url) {
    res.redirect(url.url);
  }
  res.send("<h1>No shortened url found in the database</h1>");
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

class DataBase {
  constructor(body) {
    this.body = body;
  }

  getDataBase() {
    const dataBase = fs.readFileSync("./DataBase/database.json");
    return JSON.parse(dataBase);
  }

  getById(id) {
    const db = this.getDataBase();
    return db.find((element) => element.id === id);
  }

  postInData(body) {
    const db = this.getDataBase();
    db.push(body);
    fs.writeFileSync("./DataBase/database.json", JSON.stringify(db));
  }

  isExist(url) {
    const db = this.getDataBase();
    if (db.find((element) => element.url === url)) {
      console.log("truth");
      return true;
    }
    console.log("false");
    return false;
  }

  //   async writeFile(){
  //       const dataBase=this.readFile();
  //       console.lo
  //   }
}

// const test = new DataBase();
// test.readFile(testtest);
// console.log(crazy);
// console.log("should see it after");
module.exports = app;
