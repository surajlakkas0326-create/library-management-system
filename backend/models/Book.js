
const mongoose = require("mongoose");

module.exports = mongoose.model("Book", new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}));
