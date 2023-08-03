const express = require('express');
const router = express.Router();
const {
  getCards,
  createCard,
  updateCard,
  deleteCard,
  getCardsForCurrentUser,
} = require('../controllers/cardController');

router.get('/', getCards);
router.get('/:cardName', getCardsForCurrentUser);
router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;
