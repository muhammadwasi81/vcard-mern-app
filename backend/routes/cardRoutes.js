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

router.get('/getAllCards', protect, getCards);
router.get('/:cardName', getCardsForCurrentUser);
router.post('/createCard', protect, createCard);
router.get('/card/:userId', protect, getCardsByUserId);
router.put('/:id', protect, updateCard);
router.delete('/:id', protect, deleteCard);

module.exports = router;
