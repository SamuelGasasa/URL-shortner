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
  let url;
  const database = JSON.parse(
    fs.readFileSync("./DataBase/database.json", "utf8"),
  );
  for (let i = 0; i < database.length; i++) {
    if (shortUrl === database[i].id) {
      url = database[i].url;
      res.redirect(url);
    }
  }
  res.send("<h1>No shortened url found in the database</h1>");
});

app.post("/DataBase/database.json", (req, res) => {
  let isExist = false;
  const { body } = req;
  console.log(body);
  const data = fs.readFileSync("./DataBase/database.json", "utf8");
  const parseData = JSON.parse(data);
  for (let i = 0; i < parseData.length; i++) {
    if (parseData[i].url === body.url) {
      isExist = true;
      break;
    }
  }
  if (isExist) {
    res.send("url already exist!");
  } else {
    if (isUrlValid(body.url)) {
      if (isValidHostname(body.url)) {
        body.id = ID;
        ID += 1;
        parseData.push(body);
        fs.writeFile(
          "./DataBase/database.json",
          JSON.stringify(parseData, null, 4),
          (e) => {
            if (e) {
              console.log(e);
            }
          },
        );
        res.send(body);
      }
      res.send("invalid hostname");
    }
    res.send("invalid url");
  }
});

module.exports = app;
