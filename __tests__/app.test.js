const { response } = require("express");
const request = require("supertest");
const { resource } = require("../app");

const app = require("../app");

const database = {
  db: [
    {
      url: "https://www.google.com/",
      id: "0",
      stats: {
        creationDate: "2021-3-7 0:24:18",
        redirect: 0,
        originalUrl: "https://www.google.com/",
        "shorturl-id": "0",
      },
    },
    {
      url: "http://walla.co.il",
      id: "1",
      stats: {
        creationDate: "2021-3-7 0:24:18",
        redirect: 1,
        originalUrl: "http://walla.co.il",
        "shorturl-id": "1",
      },
    },
    {
      url: "http://ynet.co.il",
      id: "2",
      stats: {
        creationDate: "2021-3-7 0:24:18",
        redirect: 0,
        originalUrl: "http://ynet.co.il",
        "shorturl-id": "2",
      },
    },
    {
      url: "http://example.com",
      id: "04f3c995-a4c3-4331-98ee-8911fd1613cf",
      stats: {
        creationDate: "2021-3-7 0:24:18",
        redirect: 1,
        originalUrl: "http://example.com",
        "shorturl-id": "04f3c995-a4c3-4331-98ee-8911fd1613cf",
      },
    },
    {
      url: "http://kladksjhjhakjjhsafgh.com",
      id: "f613b7ec-b35c-4a44-a7c3-c206286dc2ea",
      stats: {
        creationDate: "2021-3-7 0:56:11",
        redirect: 1,
        originalUrl: "http://kladksjhjhakjjhsafgh.com",
        "shorturl-id": "f613b7ec-b35c-4a44-a7c3-c206286dc2ea",
      },
    },
    {
      url: "http://kladksjhjhakjjhsafgh.com",
      id: "b2d911c9-e4e3-4838-82b6-833aa8aedaca",
      stats: {
        creationDate: "2021-3-7 0:58:10",
        redirect: 0,
        originalUrl: "http://kladksjhjhakjjhsafgh.com",
        "shorturl-id": "b2d911c9-e4e3-4838-82b6-833aa8aedaca",
      },
    },
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

  it("should return the stats of the url id", async () => {
    const response = await request(app).get(
      "/api/statistic/04f3c995-a4c3-4331-98ee-8911fd1613cf",
    );
    expect(JSON.parse(response.text)).toEqual(database.db[3].stats);
  });

  it("should return the appropriate  message if could not find the stats of the url id inserted", async () => {
    const response = await request(app).get("/api/statistic/dagdag");
    expect(response.text).toBe("No shortened url found in the database");
  });
});

describe("POST route", () => {
  it("check if the input url is valid", async () => {
    const response = await request(app)
      .post("/DataBase/database.json")
      .type(`form`)
      .send({ url: "samuel" });
    expect(response.text).toBe("invalid url");
  });
  it("check if the hostname is valid", async () => {
    const response = await request(app)
      .post("/DataBase/database.json")
      .type("form")
      .send({ url: "http://kladksjhjhakjjhsafgh.com" });
    expect(response.text).toBe("invalid hostname");
  });
});
