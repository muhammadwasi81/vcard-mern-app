import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cardService from './cardService';

/// Create new goal
export const createCard = createAsyncThunk(
  'goals/create',
  async (cardData, thunkAPI) => {
    console.log('goalData', cardData);
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.createCard(cardData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user goals
export const getCards = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.getAllCards(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user goal
export const deleteCardById = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.deleteCardById(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user goal
export const updateCardById = createAsyncThunk(
  'goals/update',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.updateCardById(goalData.id, goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const initialState = {
  cards: [],
  card: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // Get cards
    builder.addCase(getCards.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      console.log('getCards slice', action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.cards = action.payload;
    });
    builder.addCase(getCards.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = payload;
    });

    // Create a new card
    builder.addCase(createCard.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      console.log('createCard slice', action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.cards.push(action.payload);
    });
    builder.addCase(createCard.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = payload;
    });

    // Get a card by id
    // builder.addCase(getCardById.pending, (state) => {
    //   state.isLoading = true;
    //   state.isError = false;
    //   state.isSuccess = false;
    // });
    // builder.addCase(getCardById.fulfilled, (state, { payload }) => {
    //   console.log('getCardById slice', payload);
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.isSuccess = true;
    //   state.card = payload;
    // });
    // builder.addCase(getCardById.rejected, (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.isSuccess = false;
    //   state.message = payload;
    // });

    // Update a card by id
    builder.addCase(updateCardById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateCardById.fulfilled, (state, { payload }) => {
      console.log('updateCardById slice', payload);
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.card = payload;
    });
    builder.addCase(updateCardById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = payload;
    });
    builder.addCase(deleteCardById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
  },
});

export const { reset } = cardSlice.actions;
export default cardSlice.reducer;
