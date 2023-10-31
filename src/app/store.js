import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boardsSlice.jsx";
import boardReucer from "../features/board/boardSlice.js";
import cardsReducer from "../features/cards/cardsSlice.js";
import checklistsReducer from "../features/checklists/checklistsSlice.js";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    board: boardReucer,
    cards: cardsReducer,
    checklists: checklistsReducer,
  },
});

export default store;
