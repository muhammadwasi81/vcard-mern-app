const express = require('express');
const router = express.Router();
const {
  setGoal,
  updateGoal,
  deleteGoal,
  getCardUsers,
} = require('../controllers/goalController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCardUsers).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
