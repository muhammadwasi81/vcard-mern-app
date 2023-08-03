const asyncHandler = require('express-async-handler');
const Card = require('../models/CardModel');

// @desc    Get all cards
// @route   GET /api/cards
// @access  Public
const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find({}).sort({
    createdAt: -1,
    updatedAt: -1,
  });
  console.log(cards, 'getCards');
  if (!cards) {
    res.status(404).send({ message: 'Cards not found', status: false });
  }
  return res.status(200).json({
    message: 'Cards retrived successfully',
    data: cards,
    status: true,
  });
});

const getCardsForCurrentUser = asyncHandler(async (req, res) => {
  const { cardName } = req.params;
  const cards = await Card.findOne({ cardName });
  if (!cards) {
    res
      .status(200)
      .send({ message: 'Cards not found', data: [], status: false });
  }
  console.log(cards, 'getCardsForCurrentUser');
  return res.status(200).json({
    message: 'Cards retrived successfully',
    data: cards,
    status: true,
  });
});

// @desc    Create a card
// @route   POST /api/cards
// @access  Public
const createCard = asyncHandler(async (req, res) => {
  const {
    image,
    website,
    notes,
    occupations,
    phoneNumbers,
    socialLinks,
    emails,
    firstName,
    lastName,
    address,
    cardName,
  } = req.body;

  const card = await Card.create({
    image,
    website,
    notes,
    occupations,
    phoneNumbers,
    socialLinks,
    emails,
    firstName,
    lastName,
    address,
    cardName,
  });
  res
    .status(201)
    .json({ message: 'Card Created Successfully', card, status: true });
});

// @desc    Update a card
// @route   PUT /api/cards/:id
// @access  Private
const updateCard = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    telephone,
    image,
    birthday,
    website,
    snapchat,
    instagram,
    linkedin,
  } = req.body;

  const card = await Card.findById(req.params.id);
  if (card) {
    card.name = name;
    card.email = email;
    card.telephone = telephone;
    card.image = image;
    card.birthday = birthday;
    card.website = website;
    card.snapchat = snapchat;
    card.instagram = instagram;
    card.linkedin = linkedin;

    const updatedCard = await card.save();
    // console.log(updatedCard, "updateCard");
    res.status(200).json({ message: 'Card Updated Successfully', updatedCard });
  } else {
    res.status(404);
    throw new Error('Card not found');
  }
});

// @desc    Delete a card
// @route   DELETE /api/cards/:id
// @access  Private
const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (card) {
    await card.remove();
    // console.log("deleteCard");
    res.status(200).json({ message: 'Card removed successfully' });
  } else {
    res.status(404);
    throw new Error('Card not found');
  }
});

module.exports = {
  getCards,
  getCardsForCurrentUser,
  createCard,
  updateCard,
  deleteCard,
};
