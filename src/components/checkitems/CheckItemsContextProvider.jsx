import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

const CheckItemsContext = createContext();

function CheckItemsContextProvider({ children }) {
  const [checkItems, setCheckItems] = useState({});

  // Function to fetch check items for a specific checklist
  const fetchCheckItems = async (checklistId) => {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${KEY}&token=${TOKEN}`
      );

      setCheckItems((prevCheckItems) => ({
        ...prevCheckItems,
        [checklistId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching check items:", error);
    }
  };

  // Function to create a new check item for a checklist
  const createCheckItem = async (checklistId, name) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${KEY}&token=${TOKEN}&name=${name}`
      );

      const newCheckItem = response.data;
      setCheckItems((prevCheckItems) => ({
        ...prevCheckItems,
        [checklistId]: [...(prevCheckItems[checklistId] || []), newCheckItem],
      }));
    } catch (error) {
      console.error("Error creating check item:", error);
    }
  };

  // Function to delete a check item by its ID
  const deleteCheckItemById = async (checklistId, checkItemId) => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkItemId}?key=${KEY}&token=${TOKEN}`
      );

      setCheckItems((prevCheckItems) => {
        const updatedCheckItems = { ...prevCheckItems };
        const updatedItems = (prevCheckItems[checklistId] || []).filter(
          (checkItem) => checkItem.id !== checkItemId
        );

        updatedCheckItems[checklistId] = updatedItems;
        return updatedCheckItems;
      });
    } catch (error) {
      console.error("Error deleting check item:", error);
    }
  };

  // Function to Update a CheckItem using BoardId and checkItemID

  const updateCheckItem = async (boardId, idCheckItem, state) => {
    const response = axios.put(
      `https://api.trello.com/1/cards/${boardId}/checkItem/${idCheckItem}?key=${KEY}&token=${TOKEN}&state=${state}`
    );
  };

  const values = {
    checkItems,
    fetchCheckItems,
    createCheckItem,
    deleteCheckItemById,
  };

  return (
    <CheckItemsContext.Provider value={values}>
      {children}
    </CheckItemsContext.Provider>
  );
}

export default CheckItemsContextProvider;
export { CheckItemsContext };
