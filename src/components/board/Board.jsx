import React, { useEffect, useState, useReducer } from "react";
import { Grid, Button, TextField, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ListDisplay from "../lists/ListDisplay";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

const initialState = {
  allLists: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "get":
      return { allLists: action.payload };
    case "post":
      return { allLists: [...state.allLists, action.payload] };
    case "delete":
      return { allLists: action.payload };
  }
};

//   Fetch all lists in a board
const fetchLists = async (boardId) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Create a list
const createList = async (boardId, name) => {
  const response = await axios.post(
    `https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${KEY}&token=${TOKEN}`
  );
  const createdList = response.data;
  return createdList;
};

// Delete a list by ID:

const deleteListById = async (id) => {
  try {
    const response = await axios.put(
      `https://api.trello.com/1/lists/${id}/closed?key=${KEY}&token=${TOKEN}&value=true`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

function Board() {
  const { id } = useParams();
  const [newListName, setNewListName] = useState("");

  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchLists(id).then((lists) => {
      dispatcher({ type: "get", payload: lists });
    });
  }, []);

  const handleDeleteList = (listId) => {
    deleteListById(listId).then((response) => {
      const updatedList = state.allLists.filter((list) => {
        return list.id !== listId;
      });
      dispatcher({ type: "delete", payload: updatedList });
    });
  };

  const handleNewListNameChange = (event) => {
    setNewListName(event.target.value);
  };

  const handleCreateList = () => {
    if (newListName.trim() !== "") {
      createList(id, newListName).then((list) => {
        dispatcher({ type: "post", payload: list });
      });
      setNewListName("");
    }
  };

  return (
    <Grid
      sx={{
        overflowX: "auto",
        scrollBehavior: "smooth",
        minHeight: "94vh",
      }}
    >
      <Stack
        direction="row"
        width="fit-content"
        gap={3}
        p={2}
        className="lists-container"
      >
        {state.allLists.map((list) => (
          <ListDisplay
            key={list.id}
            list={list}
            onDeleteList={handleDeleteList}
          />
        ))}
        {/* For creating a new list */}
        <div>
          <TextField
            label="New List Name"
            variant="outlined"
            value={newListName}
            onChange={handleNewListNameChange}
          />
          <Button onClick={handleCreateList}>Add List</Button>
        </div>
      </Stack>
    </Grid>
  );
}

export default Board;
