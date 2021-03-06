fs = require("fs");

class DataBase {
  constructor(location) {
    this.db = JSON.parse(fs.readFileSync(location));
  }

  //   getDataBase() {
  //     const dataBase = fs.readFileSync("./DataBase/database.json");
  //     return JSON.parse(dataBase);
  //   }

  getById(res, req) {
    return this.db.find((element) => element.id === id);
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

  //   async writeFile(){
  //       const dataBase=this.readFile();
  //       console.lo
  //   }
}

module.exports = DataBase;
