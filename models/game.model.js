const mongoose = require('mongoose');

const { Schema } = mongoose;
const GameSchema = new Schema({
  title: { type: String, required: true },
  games_console: { type: String, required: true },
  cover_url: { type: String, required: true },
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
