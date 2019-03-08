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

  describe("GET /games", () => {
    it("should return 200 when the games are retrieved", async () => {
      let res = await request(server).get("/games");

      expect(res.status).toBe(200);
    });

    it("should return and empty array when the games are retrieved and games are empty", async () => {
      let res = await request(server).get("/games");

      expect(res.body).toEqual([]);
    });
  });

  describe("GET /games/:id", () => {
    it("should return 200 when returning a specified game", async () => {
      const body = { title: "test", genre: "test" };

      let res = await request(server)
        .post("/games")
        .send(body);

      let response = await request(server).get(`/games/1`);

      expect(response.status).toBe(200);
    });

    it("should return 404 when specified game does not exist", async () => {
      let response = await request(server).get(`/games/1`);

      expect(response.status).toBe(404);
    });
  });

  describe("POST /games", () => {
    it("should return 201 when game is saved", async () => {
      const body = { title: "test", genre: "test" };

      let res = await request(server)
        .post("/games")
        .send(body);

      expect(res.status).toBe(201);
    });

    it("should return game + id when game is saved", async () => {
      const body = { title: "test", genre: "test", releaseYear: 1980 };

      let res = await request(server)
        .post("/games")
        .send(body);

      expect(res.body).toEqual({
        id: 1,
        title: "test",
        genre: "test",
        releaseYear: 1980
      });
    });

    it("should return 422 if title and/or genre is/are not provided", async () => {
      const body = { title: "" };

      let res = await request(server)
        .post("/games")
        .send(body);

      expect(res.status).toBe(422);
    });
  });

  describe("DELETE /games/:id", () => {
    it("should return 204 when removing a game", async () => {
      const body = { title: "test", genre: "test" };

      await request(server)
        .post("/games")
        .send(body);

      let response = await request(server).delete(`/games/1`);

      expect(response.status).toBe(204);
    });

    it("should return 404 when the game does not exists", async () => {
      let response = await request(server).delete(`/games/1`);

      expect(response.status).toBe(404);
    });
  });
});
