import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cardService from './cardService';

export const createCard = createAsyncThunk(
  'cards/create',
  async (cardData, thunkAPI) => {
    try {
      return await cardService.createCard(cardData);
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

export const getAllCards = createAsyncThunk(
  'cards/getAll',
  async (_, thunkAPI) => {
    try {
      return await cardService.getAllCardService();
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

export const getCardDetail = createAsyncThunk(
  'cards/getCardByName',
  async (payload, thunkAPI) => {
    try {
      return await cardService.getCardDetailService(payload);
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

export const deleteCardById = createAsyncThunk(
  'cards/delete',
  async (_id, thunkAPI) => {
    console.log('id', _id);
    try {
      return await cardService.deleteCardById(_id);
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

export const updateCardById = createAsyncThunk(
  'cards/update',
  async ({ payload }, thunkAPI) => {
    try {
      return await cardService.updateCardById(payload.id);
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
  CardDetail: {},
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
    removeCards: (state, action) => {
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCards.fulfilled, (state, action) => {
        console.log('getAllCards', action.payload);
        state.isSuccess = true;
        state.isLoading = false;
        state.cards = action.payload.data;
      })
      .addCase(getAllCards.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(createCard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cards.push(action.payload);
      })
      .addCase(createCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCardById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateCardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cards = state.cards.map((card) =>
          card._id === action.payload._id ? action.payload : card
        );
      })
      .addCase(updateCardById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteCardById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteCardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cards = state.cards.filter((card) => card._id !== action.payload);
      })
      .addCase(deleteCardById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCardDetail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getCardDetail.fulfilled, (state, action) => {
        console.log('getCardDetail', action.payload.data);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.CardDetail = action.payload.data;
      })
      .addCase(getCardDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { removeCards, reset } = cardSlice.actions;
export default cardSlice.reducer;
