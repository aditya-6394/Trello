import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  allCards: {},
  error: "",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    getCards: (state, action) => {
      state.allCards[action.payload.listId] = action.payload.cards;
    },

    putCard: (state, action) => {
      state.allCards[action.payload.listId].push(action.payload.createdCard);
    },
    deleteCard: (state, action) => {
      state.allCards[action.payload.listId] = action.payload.updatedCards;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getCards, putCard, deleteCard, setLoading, setError } =
  cardsSlice.actions;

export default cardsSlice.reducer;
