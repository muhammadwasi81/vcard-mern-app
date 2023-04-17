const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");

router.get("/", protect, getCards);
router.post("/", protect, createCard);
router.put("/:id", protect, updateCard);
router.delete("/:id", protect, deleteCard);

module.exports = router;
