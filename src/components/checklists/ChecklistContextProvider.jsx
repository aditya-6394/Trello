import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

const ChecklistContext = createContext();

function ChecklistContextProvider({ children }) {
  const [checklists, setChecklists] = useState({}); // Store checklists as an object

  // Function to fetch checklists for a specific card
  const fetchChecklists = async (cardId) => {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${KEY}&token=${TOKEN}`
      );

      setChecklists((prevChecklists) => ({
        ...prevChecklists,
        [cardId]: response.data, // Store checklists using the cardId as a key
      }));
    } catch (error) {
      console.error("Error fetching checklists:", error);
    }
  };

  // Function to create a new checklist for a card
  const createChecklist = async (cardId, name) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/checklists?key=${KEY}&token=${TOKEN}`,
        {
          idCard: cardId,
          name: name,
        }
      );

      const newChecklist = response.data;
      setChecklists((prevChecklists) => ({
        ...prevChecklists,
        [cardId]: [...(prevChecklists[cardId] || []), newChecklist], // Add the new checklist to the card's checklist array
      }));
    } catch (error) {
      console.error("Error creating checklist:", error);
    }
  };

  // Function to delete a checklist by its ID
  const deleteChecklistById = async (checklistId) => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checklistId}?key=${KEY}&token=${TOKEN}`
      );

      setChecklists((prevChecklists) => {
        const updatedChecklists = { ...prevChecklists };
        const cardId = Object.keys(updatedChecklists).find((key) =>
          updatedChecklists[key].some(
            (checklist) => checklist.id === checklistId
          )
        );

        if (cardId) {
          updatedChecklists[cardId] = updatedChecklists[cardId].filter(
            (checklist) => checklist.id !== checklistId
          );
        }

        return updatedChecklists;
      });
    } catch (error) {
      console.error("Error deleting checklist:", error);
    }
  };

  const values = {
    checklists,
    fetchChecklists,
    createChecklist,
    deleteChecklistById,
  };

  return (
    <ChecklistContext.Provider value={values}>
      {children}
    </ChecklistContext.Provider>
  );
}

export default ChecklistContextProvider;
export { ChecklistContext };
