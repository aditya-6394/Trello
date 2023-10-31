import { createSlice } from "@reduxjs/toolkit";

const initialState = { board: {}, allLists: [], loading: true, error: "" };

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    getBoard: (state, action) => {
      state.board = action.payload;
    },
    getLists: (state, action) => {
      state.allLists = action.payload;
    },
    putList: (state, action) => {
      state.allLists.push(action.payload);
    },
    deleteList: (state, action) => {
      state.allLists = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getBoard, getLists, putList, deleteList, setLoading, setError } =
  boardSlice.actions;

export default boardSlice.reducer;
