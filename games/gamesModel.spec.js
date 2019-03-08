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

  describe("findByID()", () => {
    it("should return a specified game in db", async () => {
      let games = await Games.findById(1);
      expect(games).toHaveLength(0);

      await Games.insert({ title: "Pacman", genre: "Arcade" });

      games = await Games.findById(1);
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

  describe("remove()", () => {
    it("should remove(delete) the game from the database", async () => {
      await Games.insert({ title: "test", genre: "test" });

      let games = await db("games");
      expect(games).toHaveLength(1);

      await Games.remove(1);

      games = await db("games");
      expect(games).toHaveLength(0);
    });

    it("should remove(delete) the games from the database", async () => {
      await Games.insert({ title: "test1", genre: "test1" });
      await Games.insert({ title: "test2", genre: "test2" });
      await Games.insert({ title: "test3", genre: "test3" });
      await Games.insert({ title: "test4", genre: "test4" });
      await Games.insert({ title: "test5", genre: "test5" });
      await Games.insert({ title: "test6", genre: "test6" });
      await Games.remove(1);
      await Games.remove(3);
      await Games.remove(5);

      const games = await db("games");
      expect(games).toHaveLength(3);
    });
  });
});
