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

const getCardsByUserId = asyncHandler(async (req, res) => {
  console.log('triggered');
  try {
    const card = await Card.find({ user: req.params.userId });
    console.log(card, 'getCardsByUserId');
    if (!card) {
      return res.status(404).json({ msg: 'Card not found for this user' });
    }
    res.status(200).json({
      message: 'Card retrived successfully',
      data: card,
      status: false,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Server Error', status: false });
  }
});

// @desc    Create a card
// @route   POST /api/cards
// @access  Public
const createCard = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(userId, 'userId');
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
    user: userId,
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
    .json({ message: 'Card Created Successfully', data: card, status: true });
});

// @desc    Update a card
// @route   PUT /api/cards/:id
// @access  Public
const updateCard = asyncHandler(async (req, res) => {
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
  console.log(req.body, 'req.body');
  const card = await Card.findById(req.params.id);
  if (card) {
    card.image = image || card.image;
    card.website = website || card.website;
    card.notes = notes || card.notes;
    card.occupations = occupations || card.occupations;
    card.phoneNumbers = phoneNumbers || card.phoneNumbers;
    card.socialLinks = socialLinks || card.socialLinks;
    card.emails = emails || card.emails;
    card.firstName = firstName || card.firstName;
    card.lastName = lastName || card.lastName;
    card.address = address || card.address;
    card.cardName = cardName || card.cardName;

    const updatedCard = await card.save();
    console.log(updatedCard, 'updateCard');
    res.status(200).json({
      message: 'Card Updated Successfully',
      data: updatedCard,
      status: true,
    });
  } else {
    res.status(404).send({ message: 'Card not found', status: false });
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
    res
      .status(200)
      .json({ message: 'Card removed successfully', status: true });
  } else {
    res.status(404).send({ message: 'Card not found', status: false });
  }
});

module.exports = {
  getCards,
  getCardsForCurrentUser,
  createCard,
  updateCard,
  deleteCard,
  getCardsByUserId,
};
