const request = require("supertest");

const db = require("../data/dbConfig.js");

const server = require("./server.js");

describe("server.js", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET", () => {
    it("should return 200 when the games are retrieved", async () => {
      let res = await request(server).get("/games");

      expect(res.status).toBe(200);
    });

    it("should return and empty array when the games are retrieved and games are empty", async () => {
      let res = await request(server).get("/games");

      expect(res.body).toEqual([]);
    });
  });

  describe("POST", () => {
    it("should return 201 when game is saved", async () => {
      const body = { title: "test", genre: "test" };

      let res = await request(server)
        .post("/games")
        .send(body);

      expect(res.status).toBe(201);
    });

    it("should return 422 if title and/or genre is/are not provided", async () => {
      const body = { title: "" };

      let res = await request(server)
        .post("/games")
        .send(body);

      expect(res.status).toBe(422);
    });
  });
});
