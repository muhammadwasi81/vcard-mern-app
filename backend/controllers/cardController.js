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
  try {
    const { userId } = req.params;
    console.log(userId, 'userId');

    // Find cards based on the user's ID
    const cards = await Card.find({ user: userId });
    console.log(cards, 'getCardsByUserId');

    // Check if any cards were found
    if (!cards || cards.length === 0) {
      return res
        .status(404)
        .json({ message: 'Cards not found', status: false });
    }

    // Send the retrieved cards as a response
    return res.status(200).json({
      message: 'Cards retrieved successfully',
      data: cards,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', status: false });
  }
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

  const card = await Card.findById(req.params.id);
  if (card) {
    card.image = image;
    card.website = website;
    card.notes = notes;
    card.occupations = occupations;
    card.phoneNumbers = phoneNumbers;
    card.socialLinks = socialLinks;
    card.emails = emails;
    card.firstName = firstName;
    card.lastName = lastName;
    card.address = address;
    card.cardName = cardName;

    const updatedCard = await card.save();
    console.log(updatedCard, 'updateCard');
    res.status(200).json({
      message: 'Card Updated Successfully',
      updatedCard,
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
