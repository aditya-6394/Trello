import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  allBoards: [],
  error: "",
};

const boardsSlice = createSlice({
  name: "boards",
  initialState: initialState,
  reducers: {
    getBoards: (state, action) => {
      state.allBoards = action.payload;
    },
    putBoard: (state, action) => {
      state.allBoards.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getBoards, putBoard, setLoading, setError } =
  boardsSlice.actions;
export default boardsSlice.reducer;
