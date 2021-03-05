const fs = require("fs");

class DataBase {
  constructor(body) {
    this.body = body;
  }

  getDataBase() {
    const dataBase = fs.readFileSync("/DataBase/database.json");
    return JSON.parse(dataBase);
  }

  getById(id) {
    const db = this.getDataBase();
    return db.find((element) => element.id === id);
  }

  //   async writeFile(){
  //       const dataBase=this.readFile();
  //       console.lo
  //   }
}

const test = new DataBase();
test.readFile();
