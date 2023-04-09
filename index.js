require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {
  PORT = 3333,
  DB_URL = "mongodb://localhost/games",
} = process.env;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());


console.log('DB_URL', DB_URL);
const main = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('DB Connected');
  } catch (err) {
    console.log(err)
  }
}

main().catch(err => console.log(err));

const { Schema } = mongoose;
const GameSchema = new Schema({
  title: { type: String, required: true },
  games_console: { type: String, required: true },
  cover_url: { type: String, required: true }
});

const Game = mongoose.model("Game", GameSchema);

const apiRoot = "/api/";
const version = "v1";
const fullAPIRoot = apiRoot + version;

app.get(`${fullAPIRoot}/games/:id?`, async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }

  try {
    const games = await Game.find(query);
    res.status(200).json(games);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.post(`${fullAPIRoot}/games/`, async (req, res) => {
  const gameData = req.body;
  console.log("gameData", gameData);
  try {
    const newGame = new Game(gameData);
    const result = await newGame.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.put(`${fullAPIRoot}/games/:id`, async (req, res) => {
  const updateData = req.body;
  console.log(`Updating ${req.params.id}`, updateData);

    try {
      const result = await Game.updateOne({ _id: req.params.id }, req.body);
      if(result.n === 0) return res.sendStatus(404)
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err)
    }
});

app.delete(`${fullAPIRoot}/games/:id`, async (req, res) => {
  try {
    const result = await Game.deleteOne({ _id: req.params.id });
    if(result.n === 0) return res.sendStatus(404)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err)
  }
});

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});