const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getCardUsers = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  console.log(getGoals, 'getGoals');
  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(req.body, 'req.body');
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const goal = await Goal.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCardUsers,
  setGoal,
  updateGoal,
  deleteGoal,
};
