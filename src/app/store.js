import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boardsSlice.jsx";
import boardReucer from "../features/board/boardSlice.js";
import cardsReducer from "../features/cards/cardsSlice.js";
import checklistsReducer from "../features/checklists/checklistsSlice.js";
import checkItemsReducer from "../features/checkitems/checkitemsSlice.js";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    board: boardReucer,
    cards: cardsReducer,
    checklists: checklistsReducer,
    checkItems: checkItemsReducer,
  },
});

export default store;
