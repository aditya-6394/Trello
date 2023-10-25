import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

const CardContext = createContext();

function CardContextProvider({ children }) {
  const [cardsByList, setCardsByList] = useState({});

  // Function to fetch cards for a specific list
  const fetchCards = async (listId) => {
    const response = await axios.get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${KEY}&token=${TOKEN}`
    );

    // Update the state with cards for the specified list
    setCardsByList((prevCardsByList) => ({
      ...prevCardsByList,
      [listId]: response.data,
    }));
  };

  // Function to create a new card
  const createCard = async (listId, cardName) => {
    const response = await axios.post(
      `https://api.trello.com/1/cards?name=${cardName}&idList=${listId}&key=${KEY}&token=${TOKEN}`
    );

    // Update the state with the new card for the specified list
    setCardsByList((prevCardsByList) => ({
      ...prevCardsByList,
      [listId]: [...(prevCardsByList[listId] || []), response.data],
    }));
  };

  // Function to delete a card by its ID
  const deleteCardById = async (listId, cardId) => {
    await axios.delete(
      `https://api.trello.com/1/cards/${cardId}?key=${KEY}&token=${TOKEN}`
    );

    // Update the state by removing the deleted card from the specified list
    setCardsByList((prevCardsByList) => {
      const updatedList = (prevCardsByList[listId] || []).filter(
        (card) => card.id !== cardId
      );
      return {
        ...prevCardsByList,
        [listId]: updatedList,
      };
    });
  };

  const values = { cardsByList, fetchCards, createCard, deleteCardById };
  return <CardContext.Provider value={values}>{children}</CardContext.Provider>;
}

export default CardContextProvider;
export { CardContext };
