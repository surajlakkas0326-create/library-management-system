const router = require("express").Router();
const Book = require("../models/Book");
const auth = require("../middleware/auth");

/* ADMIN: Add book */
router.post("/", auth(["admin"]), async (req, res) => {
  if (!req.body.title || !req.body.author) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const book = await Book.create({
    title: req.body.title,
    author: req.body.author
  });

  res.json(book);
});

/* ALL USERS: View all books */
router.get("/", auth(), async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* ADMIN: Delete book */
router.delete("/:id", auth(["admin"]), async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });

  await book.deleteOne();
  res.json({ message: "Deleted" });
});

module.exports = router;
