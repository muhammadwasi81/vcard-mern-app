const asyncHandler = require("express-async-handler");
const Card = require("../models/CardModel");

// @desc    Get all cards
// @route   GET /api/cards
// @access  Private
const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find({ user: req.user._id });
  console.log(cards, "getCards");
  res.status(200).json(cards);
});

// @desc    Create a card
// @route   POST /api/cards
// @access  Private
const createCard = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    telephone,
    birthday,
    website,
    snapchat,
    instagram,
    linkedin,
    image,
  } = req.body;
  console.log(req.body.image, "req.body");
  if (
    !name ||
    !email ||
    !telephone ||
    !birthday ||
    !website ||
    !snapchat ||
    !instagram ||
    !linkedin ||
    !image
  ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  const userExists = await Card.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const card = await Card.create({
    name,
    email,
    telephone,
    image,
    birthday,
    website,
    snapchat,
    instagram,
    linkedin,
    user: req.user._id,
  });
  console.log(card, "createCard");
  res.status(201).json(card);
});

// @desc    Update a card
// @route   PUT /api/cards/:id
// @access  Private
const updateCard = asyncHandler(async (req, res) => {
  const { name, email, telephone, qrCode } = req.body;
  if (!name || !email || !telephone) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  const card = await Card.findById(req.params.id);
  if (card) {
    card.name = name;
    card.email = email;
    card.telephone = telephone;
    card.qrCode = qrCode;
    const updatedCard = await card.save();
    console.log(updatedCard, "updateCard");
    res.status(200).json(updatedCard);
  } else {
    res.status(404);
    throw new Error("Card not found");
  }
});

// @desc    Delete a card
// @route   DELETE /api/cards/:id
// @access  Private
const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (card) {
    await card.remove();
    console.log("deleteCard");
    res.status(200).json({ message: "Card removed" });
  } else {
    res.status(404);
    throw new Error("Card not found");
  }
});

module.exports = {
  getCards,
  createCard,
  updateCard,
  deleteCard,
};
