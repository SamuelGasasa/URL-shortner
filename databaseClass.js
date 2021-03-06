module.exports = class DataBase {
  constructor(location) {
    this.fs = require("fs");
    this.isValidHostname = require("is-valid-hostname");
    this.database = JSON.parse(this.fs.readFileSync(location));
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
      if (this.isUrlValid(body.url)) {
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

  isUrlValid(url) {
    const res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    if (res == null) return false;
    else return true;
  }
};
