const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const {
  getGames,
  addGame,
  updateGame,
  removeGame,
} = require('../controllers/game.controller');

router
  .get('/:id?', getGames)
  .post(
    '/',
    [
      body('title').isString().notEmpty().trim(),
      body('games_console').isString().notEmpty().trim(),
      body('cover_url').isString().notEmpty().trim(),
    ],
    addGame,
  )
  .put(
    '/:id',
    [
      body('title').isString().optional().trim(),
      body('games_console').isString().optional().trim(),
      body('cover_url').isString().optional().trim(),
    ],
    updateGame,
  )
  .delete('/:id', removeGame);

module.exports = router;
