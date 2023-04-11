const express = require('express');

const app = express();

require('./middleware')(app);
require('./db');
require('./routes/index')(app);

module.exports = app;
