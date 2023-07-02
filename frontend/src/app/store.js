import { configureStore } from '@reduxjs/toolkit';
import authReducer, { refreshToken } from '../features/auth/authSlice';
import cardReducer from '../features/cards/cardSlice';
import api from '../features/auth/services/index';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    });
  },
});

store.dispatch(refreshToken());
