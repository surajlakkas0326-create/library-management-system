const router = require("express").Router();
const BookRequest = require("../models/BookRequest");
const auth = require("../middleware/auth");

/* USER: Create request */
router.post("/", auth(), async (req, res) => {
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ message: "Book ID required" });
  }

  const exists = await BookRequest.findOne({
    bookId,
    userId: req.user.id,
    status: "requested"
  });

  if (exists) {
    return res.status(400).json({ message: "Already requested" });
  }

  const request = await BookRequest.create({
    bookId,
    userId: req.user.id
  });

  res.json(request);
});

/* USER: Read own requests */
router.get("/my", auth(), async (req, res) => {
  const requests = await BookRequest.find({ userId: req.user.id })
    .populate("bookId");
  res.json(requests);
});

/* USER: Delete (cancel) request */
router.delete("/:id", auth(), async (req, res) => {
  const request = await BookRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  if (request.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  if (request.status === "issued") {
    return res.status(400).json({ message: "Cannot cancel issued book" });
  }

  await request.deleteOne();
  res.json({ message: "Request cancelled" });
});

/* ADMIN: Read all requests */
router.get("/", auth(["admin"]), async (req, res) => {
  const requests = await BookRequest.find()
    .populate("bookId")
    .populate("userId", "email");
  res.json(requests);
});

/* ADMIN: Issue book */
router.put("/:id/issue", auth(["admin"]), async (req, res) => {
  const request = await BookRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = "issued";
  request.issueDate = new Date();
  await request.save();

  res.json(request);
});

module.exports = router;
