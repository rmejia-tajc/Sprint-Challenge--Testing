const db = require("../data/dbConfig.js");
const Games = require("./gamesModel.js");

describe("games model", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  describe("find()", () => {
    it("should return a list of games in db", async () => {
      let games = await Games.find();
      expect(games).toHaveLength(0);

      await Games.insert({ title: "Pacman", genre: "Arcade" });

      games = await Games.find();
      expect(games).toHaveLength(1);
    });
  });

  describe("insert()", () => {
    it("should insert(create) the new game into the database", async () => {
      let games = await db("games");
      expect(games).toHaveLength(0);

      await Games.insert({ title: "Pacman", genre: "Arcade" });

      games = await db("games");
      expect(games).toHaveLength(1);
    });

    it("should insert(create) the new games into the database", async () => {
      await Games.insert({ title: "Pacman", genre: "Arcade" });
      await Games.insert({ title: "Asteroid", genre: "Arcade" });
      await Games.insert({ title: "Pong", genre: "Arcade" });

      const games = await db("games");
      expect(games).toHaveLength(3);
    });

    it("should insert(create) the new game into the database", async () => {
      let game = await Games.insert({ title: "Pacman", genre: "Arcade" });
      expect(game.title).toBe("Pacman");

      game = await Games.insert({ title: "Asteroid", genre: "Arcade" });
      expect(game.title).toBe("Asteroid");

      game = await Games.insert({ title: "Pong", genre: "Arcade" });
      expect(game.title).toBe("Pong");
    });
  });
});
