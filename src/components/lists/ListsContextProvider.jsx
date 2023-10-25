import React, { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

const ListContext = createContext();
function ListContextProvider({ children }) {
  const [lists, setLists] = useState([]);

  //   Fetch all lists in a board
  const fetchLists = async (boardId) => {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${KEY}&token=${TOKEN}`
    );
    setLists(response.data);
  };

  //   Create List in a board

  const createList = async (boardId, name) => {
    const response = await axios.post(
      `https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${KEY}&token=${TOKEN}`
    );
    setLists((prevLists) => {
      return [...prevLists, response.data];
    });
  };

  // Delete a list using it's id

  const deleteListById = async (id) => {
    try {
      const response = await axios.put(
        `https://api.trello.com/1/lists/${id}/closed?key=${KEY}&token=${TOKEN}&value=true`
      );

      setLists((prevLists) => {
        return prevLists.filter((list) => {
          return list.id !== response.data.id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const values = { lists, setLists, fetchLists, createList, deleteListById };
  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
}

export default ListContextProvider;
export { ListContext };
