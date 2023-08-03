import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../features/cards/cardSlice';

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
});
