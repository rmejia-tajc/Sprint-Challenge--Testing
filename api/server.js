const express = require("express");

const Games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "SANITY CHECK!" });
});

server.get("/games", async (req, res) => {
  try {
    const games = await Games.find(req.query);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get("/games/:id", async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);

    if (game.length > 0) {
      res.status(200).json(game);
    } else {
      res
        .status(404)
        .json({ message: "The game with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/games", async (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res.status(422).json({
      errorMessage: "Please provide a title and genre"
    });
  } else {
    try {
      const game = await Games.insert(req.body);
      res.status(201).json(game);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

server.delete("/games/:id", async (req, res) => {
  try {
    const count = await Games.remove(req.params.id);

    if (count > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: "The game with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The game could not be removed" });
  }
});

module.exports = server;
