const db = require("../data/dbConfig.js");

module.exports = {
  find,
  insert
};

function find() {
  return db("games");
}

async function insert(game) {
  const [id] = await db("games").insert(game);

  return db("games")
    .where({ id })
    .first();
}
