module.exports = class DataBase {
  constructor(location) {
    this.fs = require("fs");
    this.isValidHostname = require("is-valid-hostname");
    this.database = JSON.parse(this.fs.readFileSync(location));
    this.validUrl = require("valid-url");
  }

  //   getDataBase() {
  //     const dataBase = fs.readFileSync("./DataBase/database.json");
  //     return JSON.parse(dataBase);
  //   }

  getById(req, res) {
    // console.log(this.database);
    const { shortUrl } = req.params;
    const url = this.database.db.find((element) => element.id === shortUrl);
    if (url) {
      res.redirect(url.url);
    }
    res.send("No shortened url found in the database");
  }

  postInData(req, res, id) {
    const { body } = req;
    if (this.isExist(body.url)) {
      res.send("url already exist!");
    } else {
      if (this.validUrl.isWebUri(body.url)) {
        console.log(body.url);
        if (this.isValidHostname(body.url)) {
          body.id = id;
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
          // database.postInData(body);
          this.database.db.push(body);
          this.fs.writeFileSync(
            "./DataBase/database.json",
            JSON.stringify(this.database),
          );
          res.send(body);
        }
        res.send("invalid hostname");
      }
      res.send("invalid url");
    }
  }

  isExist(url) {
    if (this.database.db.find((element) => element.url === url)) {
      //   console.log("truth");
      return true;
    }
    // console.log("false");
    return false;
  }

  isValidURL(str) {
    var urlRegex =
      "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
    var url = new RegExp(urlRegex, "i");
    return str.length < 2083 && url.test(str);
  }
};
