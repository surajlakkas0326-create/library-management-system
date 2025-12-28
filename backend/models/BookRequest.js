const mongoose = require("mongoose");

const BookRequestSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["requested", "issued"],
    default: "requested"
  },
  issueDate: {
    type: Date
  }
});

module.exports = mongoose.model("BookRequest", BookRequestSchema);
