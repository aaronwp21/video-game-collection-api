const express = require("express");
const cors = require("cors")

module.exports = function(app) {
  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors());
}