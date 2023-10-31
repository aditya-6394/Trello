import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getCards,
  putCard,
  deleteCard,
  setLoading,
  setError,
} from "../../features/cards/cardsSlice";
import { Stack, Grid, Paper } from "@mui/material";
import Card from "./Card";
import AddCard from "./AddCard";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

// Function to fetch cards for a specific list
const fetchCards = async (listId) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
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
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards(listId)
      .then((cards) => {
        dispatch(getCards({ listId, cards }));
        setLoading(false);
        setError("");
      })
      .catch((error) => setError(error.message));
  }, []);

  const handleAddCard = (newCardText) => {
    if (newCardText.trim() !== "") {
      console.log("New  card text");
      createCard(listId, newCardText)
        .then((createdCard) => {
          dispatch(putCard({ listId, createdCard }));
          setError("");
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const handleDeleteCard = (cardId) => {
    deleteCardById(cardId).then((data) => {
      const updatedCards = allCards.filter((card) => {
        return card.id !== cardId;
      });
      dispatch(deleteCard({ listId, updatedCards }));
    });
  };

  const allCards = useSelector((state) => state.cards.allCards[listId]);
  const lists = useSelector((state) => state.cards.allCards);

  return (
    <Grid>
      <Stack>
        {allCards &&
          allCards.map((card) => {
            return (
              <Card key={card.id} card={card} onDelete={handleDeleteCard} />
            );
          })}
      </Stack>
      <Paper
        sx={{
          padding: 1.3,
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
