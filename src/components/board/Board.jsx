import React, { useEffect, useState, useReducer } from "react";
import { Grid, Button, TextField, Stack, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import ListDisplay from "../lists/ListDisplay";
import AddListItem from "./AddList";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

const initialState = {
  allLists: [],
  board: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "get":
      return { ...state, allLists: action.payload };
    case "post":
      return { ...state, allLists: [...state.allLists, action.payload] };
    case "delete":
      return { ...state, allLists: action.payload };
    case "board":
      return { ...state, board: action.payload };
    default:
      return state;
  }
};

const fetchBoardAndLists = async (boardId) => {
  try {
    const [boardResponse, listsResponse] = await Promise.all([
      axios.get(
        `https://api.trello.com/1/boards/${boardId}?key=${KEY}&token=${TOKEN}`
      ),
      axios.get(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${KEY}&token=${TOKEN}`
      ),
    ]);

    const boardData = boardResponse.data;
    const listsData = listsResponse.data;

    return { board: boardData, allLists: listsData };
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

  // dispatcher({ type: "post", payload: createdList });

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

  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchBoardAndLists(id).then((data) => {
      dispatcher({ type: "board", payload: data.board });
      dispatcher({ type: "get", payload: data.allLists });
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

  const handleCreateList = (id, newListName) => {
    createList(id, newListName).then((list) => {
      dispatcher({ type: "post", payload: list });
    });
  };

  return (
    <Grid
      sx={{
        overflowX: "auto",
        scrollBehavior: "smooth",
        minHeight: "94vh",
        backgroundColor: state.board.prefs
          ? state.board.prefs.backgroundColor
          : "",
        backgroundImage: state.board.prefs
          ? `url(${state.board.prefs.backgroundImage})`
          : undefined,
        backgroundSize: "cover",
      }}
    >
      <Stack direction="row" width="fit-content" gap={2} p={2}>
        {state.allLists &&
          state.allLists.map((list) => (
            <ListDisplay
              key={list.id}
              list={list}
              onDeleteList={handleDeleteList}
            />
          ))}

        <Paper
          elevation={2}
          sx={{
            width: "272px",
            borderRadius: 2.5,
            padding: 2,
            height: "fit-content",
            backgroundColor: "#ebecf0",
          }}
        >
          <AddListItem id={id} handleCreateList={handleCreateList} />
        </Paper>
      </Stack>
    </Grid>
  );
}

export default Board;
