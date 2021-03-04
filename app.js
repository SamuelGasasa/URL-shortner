require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

const ID = 0;
app.use(cors());
app.use(express.json());

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", (req, res) => {
  let isExist = false;
  const { body } = req;
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
    parseData.push(body);
    fs.writeFile(
      "./DataBase/database.json",
      JSON.stringify(parseData, null, 4),
      (e) => {
        if (e) {
          console.log(e);
        }
        res.send(parseData);
      },
    );
  }
});

module.exports = app;
