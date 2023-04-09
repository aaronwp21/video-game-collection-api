const { body, validationResult } = require('express-validator');
const Game = require("../models/game.model")
const fullAPIRoot = require("../routes/games.routes");

module.exports = function (app) {
  app.get(`${fullAPIRoot}/games/:id?`, async (req, res) => {
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
  });

  app.post(
    `${fullAPIRoot}/games/`,
    [
      body('title').isString().notEmpty().trim(),
      body('games_console').isString().notEmpty().trim(),
      body('cover_url').isString().notEmpty().trim(),
    ],
    async (req, res) => {
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
    },
  );

  app.put(
    `${fullAPIRoot}/games/:id`,
    [
      body('title').isString().optional().trim(),
      body('games_console').isString().optional().trim(),
      body('cover_url').isString().optional().trim(),
    ],
    async (req, res) => {
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
    },
  );

  app.delete(`${fullAPIRoot}/games/:id`, async (req, res) => {
    try {
      const result = await Game.deleteOne({ _id: req.params.id });
      if (result.n === 0) return res.sendStatus(404);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.all('*', (req, res) => {
    res.sendStatus(404);
  });
};