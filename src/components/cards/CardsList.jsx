import React, { useEffect, useReducer } from "react";
import { Stack, Grid, Paper } from "@mui/material";
import Card from "./Card";
import AddCard from "./AddCard";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

const initialState = {
  allCards: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "get":
      return { allCards: action.payload };
    case "post":
      return { allCards: [...state.allCards, action.payload] };
    case "delete":
      return { allCards: [...action.payload] };
  }
};

// Function to fetch cards for a specific list
const fetchCards = async (listId) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Function to create a new card
const createCard = async (listId, cardName) => {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards?name=${cardName}&idList=${listId}&key=${KEY}&token=${TOKEN}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Function to delete a card by its ID
const deleteCardById = async (cardId) => {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/cards/${cardId}?key=${KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

function CardsList({ listId }) {
  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCards(listId).then((lists) => {
      dispatcher({ type: "get", payload: lists });
    });
  }, []);

  const handleAddCard = (newCardText) => {
    if (newCardText.trim() !== "") {
      console.log("New  card text");
      createCard(listId, newCardText).then((createdCard) => {
        dispatcher({ type: "post", payload: createdCard });
      });
    }
  };

  const handleDeleteCard = (cardId) => {
    deleteCardById(cardId).then((data) => {
      const updatedCards = state.allCards.filter((card) => {
        return card.id !== cardId;
      });
      dispatcher({ type: "delete", payload: updatedCards });
    });
  };

  return (
    <Grid>
      <Stack>
        {state.allCards.map((card) => {
          return <Card key={card.id} card={card} onDelete={handleDeleteCard} />;
        })}
      </Stack>
      <Paper
        sx={{
          padding: 1.3,
          // borderRadius: "0.8rem",
          backgroundColor: "#ebecf0",
          elevation: 0,
          border: "none",
        }}
      >
        <AddCard handleAddElement={handleAddCard} listId={listId} />
      </Paper>
    </Grid>
  );
}

export default CardsList;
