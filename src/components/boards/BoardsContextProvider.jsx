import React, { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

async function getAllBoards() {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const BoardsContext = createContext();

function BoardsContextProvider({ children }) {
  const [allBoards, setAllBoards] = useState(undefined);
  useEffect(() => {
    getAllBoards().then((data) => {
      setAllBoards(data);
    });
  }, []);
  const boardBackground = {};
  if (allBoards) {
    allBoards.forEach((board) => {
      boardBackground[board.id] = {
        backgroundColor: board.prefs.backgroundColor,
        backgroundImage: board.prefs.backgroundImage,
      };
    });
  }

  const values = { allBoards, setAllBoards, boardBackground };
  return (
    <BoardsContext.Provider value={values}>{children}</BoardsContext.Provider>
  );
}

export default BoardsContextProvider;
export { BoardsContext };
