import axios from 'axios';

const API_URL = '/api/cards/';

// Create a new card
const createCard = async (cardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(API_URL, cardData, config);
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

// Get all cards
const getAllCards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (err) {
    console.log(err, { cause: err });
  }
};

// Get a card by id
const getCardsForCurrentUser = async (id, token) => {
  console.log(id, 'id in service');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(API_URL + id, config);
    console.log(response.data, 'getCardById');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Update a card by id
const updateCardById = async (id, cardData, token) => {
  console.log(id, 'id in service');
  console.log(cardData, 'cardData in service');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(API_URL + id, cardData, config);
    console.log(response.data, 'update service');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Delete a card by id
const deleteCardById = async (id, token) => {
  console.log(id, 'id in service');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(API_URL + id, config);
    console.log(response.data, 'delete service');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const cardService = {
  createCard,
  getAllCards,
  getCardsForCurrentUser,
  updateCardById,
  deleteCardById,
};

export default cardService;
