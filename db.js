const mongoose = require("mongoose");

const {
  DB_URL = "mongodb://localhost/games",
} = process.env

const main = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (err) {
    console.log(err)
  }
}

main().catch(err => console.log(err));

module.exports = main;