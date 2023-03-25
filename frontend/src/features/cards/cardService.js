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
    console.log(response.data, 'createCard');
    return response.data;
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

// Get a card by id
const getCardById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(API_URL + id, config);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Update a card by id
const updateCardById = async (id, cardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(API_URL + id, cardData, config);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Delete a card by id
const deleteCardById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(API_URL + id, config);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const cardService = {
  createCard,
  getAllCards,
  getCardById,
  updateCardById,
  deleteCardById,
};

export default cardService;
