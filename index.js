require('dotenv').config()

const {
  PORT = 3333,
  NODE_ENV = 'development'
} = process.env;

const server = require("./server");

server.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});