import axios from 'axios';

const API_URL = '/api/cards/';

// Create a new card
const createCard = async (cardData) => {
  try {
    const response = await axios.post(API_URL, cardData);
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

// Get all cards
const getAllCardService = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.log(err, { cause: err });
    throw new Error(err.message);
  }
};

// Get a card by id
const getCardDetailService = async (payload) => {
  try {
    const response = await axios.get(API_URL + payload);
    console.log(response.data, 'getCardDetailService');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Update a card by id
const updateCardById = async (id, cardData) => {
  console.log(id, 'id in service');
  try {
    const response = await axios.put(API_URL + id, cardData);
    console.log(response.data, 'update service');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Delete a card by id
const deleteCardById = async (id) => {
  console.log(id, 'id in service');
  try {
    const response = await axios.delete(API_URL + id);
    console.log(response.data, 'delete service');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const cardService = {
  createCard,
  getAllCardService,
  getCardDetailService,
  updateCardById,
  deleteCardById,
};

export default cardService;
