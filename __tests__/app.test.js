const { response } = require("express");
const request = require("supertest");
const { resource } = require("../app");

const app = require("../app");

const database = {
  db: [
    { url: "https://www.google.com/", id: "0" },
    { url: "http://walla.co.il", id: "1" },
    { url: "http://ynet.co.il", id: "2" },
    { url: "kldaj.com", id: 3 },
    { url: "lkad.adgja", id: 3 },
    { url: "kaf.akgjd", id: "458dd37b-41df-4754-882e-6af3536cc464" },
  ],
};

describe("GET route", () => {
  it("should redirect to the url of the given short URL id", async () => {
    const response = await request(app).get("/api/shorturl/1");
    expect(response.status).toBe(302);
    expect(response.header.location).toBe(database.db[1].url);
  });

  it("should return the according the proper error if the url id is not found", async () => {
    const response = await request(app).get("/api/shorturl/1234");
    expect(response.status).toBe(200);
    // console.log(response);
    expect(response.text).toBe("No shortened url found in the database");
  });
});

describe("POST route", () => {
  it("check if the input url is valid", async () => {
    const response = await await request(app)
      .post("/DataBase/database.json")
      .type(`form`)
      .send({ url: "samuel" });
    expect(response.text).toBe("invalid url");
  });
});
