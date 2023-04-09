const express = require("express")

const app = express();

require("./middleware")(app);
require("./db");
require("./controllers/game.controller")(app);

module.exports = app;