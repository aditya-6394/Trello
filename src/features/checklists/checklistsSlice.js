import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  loading: true,
  checklists: {},
};

const checklistsSlice = createSlice({
  name: "checklists",
  initialState,
  reducers: {
    getChecklists: (state, action) => {
      state.checklists[action.payload.cardId] = action.payload.checkLists;
    },
    putChecklist: (state, action) => {
      state.checklists[action.payload.cardId].push(
        action.payload.createdChecklist
      );
    },
    deleteChecklist: (state, action) => {
      state.checklists[action.payload.cardId] = action.payload.updatedList;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default checklistsSlice.reducer;
export const {
  getChecklists,
  putChecklist,
  deleteChecklist,
  setLoading,
  setError,
} = checklistsSlice.actions;
