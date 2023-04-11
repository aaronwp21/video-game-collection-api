const { validationResult } = require('express-validator');
const Game = require('../models/game.model');

exports.getGames = async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }

  try {
    const games = await Game.find(query);
    res.status(200).json(games);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addGame = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const gameData = req.body;
  try {
    const newGame = new Game(gameData);
    const result = await newGame.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateGame = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const updateData = req.body;
  try {
    const result = await Game.updateOne({ _id: req.params.id }, req.body);
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.removeGame = async (req, res) => {
  try {
    const result = await Game.deleteOne({ _id: req.params.id });
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};
