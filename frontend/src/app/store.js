import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cardReducer from '../features/cards/cardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardReducer,
  },
});
