const express = require('express');
const router = express.Router();
const {
  getCards,
  createCard,
  updateCard,
  deleteCard,
  getCardsForCurrentUser,
  getCardsByUserId,
} = require('../controllers/cardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getCards);
router.get('/:cardName', getCardsForCurrentUser);
router.post('/', createCard);
router.get('/:userId', getCardsByUserId);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;
