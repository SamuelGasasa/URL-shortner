module.exports = class DataBase {
  constructor(location) {
    this.location = location;
    this.fs = require("fs");
    this.isValidHostname = require("is-valid-hostname");
    this.validUrl = require("valid-url");
  }

  getStats(req, res) {
    const { shorturlId } = req.params;
    this.fs.readFile(this.location, (error, data) => {
      data = JSON.parse(data);
      const url = data.db.find((element) => element.id === shorturlId);
      if (url) {
        res.send(url.stats);
        return;
      }
      res.send("No shortened url found in the database");
    });
  }

  getById(req, res) {
    const { shortUrl } = req.params;
    this.fs.readFile(this.location, (error, data) => {
      data = JSON.parse(data);
      const url = data.db.find((element) => element.id === shortUrl);
      if (url) {
        const index = data.db.indexOf(url);
        data.db[index].stats.redirect += 1;

        this.fs.writeFileSync(this.location, JSON.stringify(data));
        res.status(200).redirect(url.url);
        return;
      }
      res.send("No shortened url found in the database");
    });
  }

  postInData(req, res, id) {
    const { body } = req;
    if (this.isExist(body.url)) {
      console.log("got here");
      res.send("url already exist!");
      return;
    }
    this.fs.readFile(this.location, (err, data) => {
      // const { body } = req;
      data = JSON.parse(data);

      // if (this.isExist(body.url)) {
      //   console.log("got here");
      //   res.send("url already exist!");
      //   return;
      // } else {
      if (this.validUrl.isWebUri(body.url)) {
        if (this.isValidHostname(body.url)) {
          body.id = id;
          body.stats = {
            creationDate: this.createDate(new Date()),
            redirect: 0,
            originalUrl: body.url,
            "shorturl-id": id,
          };
          data.db.push(body);
          this.fs.writeFileSync(
            "./DataBase/database.json",
            JSON.stringify(data),
          );
          res.send(body);
          return;
        }
        res.send("invalid hostname");
        return;
      }
      res.send("invalid url");
    });
  }

  isExist(url) {
    this.fs.readFile(this.location, (error, data) => {
      data = JSON.parse(data);
      console.log(data);
      const isExist = data.db.find((element) => element.url === url);
      console.log(isExist);
      if (isExist) {
        return true;
      } else {
        return false;
      }
    });
  }

  isValidURL(str) {
    var urlRegex =
      "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
    var url = new RegExp(urlRegex, "i");
    return str.length < 2083 && url.test(str);
  }

  createDate(date) {
    let newDate;
    newDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    return newDate;
  }
};
