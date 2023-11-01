import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: "",
  checkItems: {},
};

const checkitemsSlice = createSlice({
  name: "checkitems",
  initialState,
  reducers: {
    getCheckitems: (state, action) => {
      state.checkItems[action.payload.checklistId] = action.payload.checkitems;
    },
    putCheckitem: (state, action) => {
      state.checkItems[action.payload.checklistId].push(
        action.payload.checkitem
      );
    },
    deleteCheckitem: (state, action) => {
      state.checkItems[action.payload.checklistId] =
        action.payload.updatedCheckItemsList;
    },
    updateCheckitems: (state, action) => {
      state.checkItems[action.payload.checklistId] =
        action.payload.updatedCheckItemsList;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default checkitemsSlice.reducer;

export const {
  getCheckitems,
  putCheckitem,
  deleteCheckitem,
  updateCheckitems,
  setLoading,
  setError,
} = checkitemsSlice.actions;
