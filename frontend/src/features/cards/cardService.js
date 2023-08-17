import axios from 'axios';
import apiGlobal from '../../utils/apiGlobal';

// Create a new card
const createCard = async (cardData) => {
  try {
    const response = await apiGlobal.post('createCard', cardData);
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

export const getCardById = async (id) => {
  try {
    const response = await apiGlobal.get(`card/${id}`);
    console.log(response.data, 'getCardById service');
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

// Get all cards
const getAllCardService = async () => {
  try {
    const response = await apiGlobal.get('getAllCards');
    return response.data;
  } catch (err) {
    console.log(err, { cause: err });
    throw new Error(err.message);
  }
};

// Get a card by id
const getCardDetailService = async (payload) => {
  try {
    const response = await apiGlobal.get(payload);
    console.log(response.data, 'getCardDetailService');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Update a card by id
const updateCardByIdService = async (id, payload) => {
  console.log(payload, id, 'payload in service');
  try {
    const response = await apiGlobal.put(`updateCard/${id}`, payload);
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
    const response = await apiGlobal.delete(`deleteCard/${id}`);
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
  updateCardByIdService,
  deleteCardById,
  getCardById,
};

export default cardService;
