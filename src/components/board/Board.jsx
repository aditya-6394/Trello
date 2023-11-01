import React, { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useDispatch, useSelector } from "react-redux";
import {
  getBoard,
  getLists,
  putList,
  deleteList,
  setLoading,
  setError,
} from "../../features/board/boardSlice";
import { Grid, Stack, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import ListDisplay from "../lists/ListDisplay";
import AddListItem from "./AddList";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

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
    throw new Error(error);
  }
};

// Create a list
const createList = async (boardId, name) => {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${KEY}&token=${TOKEN}`
    );
    const createdList = response.data;
    console.log("created list");

    return createdList;
  } catch (error) {
    throw new Error(error);
  }
};

// Delete a list by ID:

const deleteListById = async (id) => {
  try {
    const response = await axios.put(
      `https://api.trello.com/1/lists/${id}/closed?key=${KEY}&token=${TOKEN}&value=true`
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

function Board() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    fetchBoardAndLists(id)
      .then((data) => {
        dispatch(getBoard(data.board));
        dispatch(getLists(data.allLists));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        showBoundary(error);
        setError(error.message);
      });
  }, []);

  const allLists = useSelector((state) => state.board.allLists);
  const board = useSelector((state) => state.board.board);

  const handleDeleteList = (listId) => {
    dispatch(setLoading(true));
    deleteListById(listId)
      .then((response) => {
        setLoading(false);
        setError("");
        const updatedList = allLists.filter((list) => {
          return list.id !== listId;
        });
        dispatch(deleteList(updatedList));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleCreateList = (id, newListName) => {
    createList(id, newListName)
      .then((list) => {
        dispatch(putList(list));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Grid
      sx={{
        overflowX: "auto",
        scrollBehavior: "smooth",
        minHeight: "94vh",
        backgroundColor: board.prefs ? board.prefs.backgroundColor : "",
        backgroundImage: board.prefs
          ? `url(${board.prefs.backgroundImage})`
          : undefined,
        backgroundSize: "cover",
      }}
    >
      <Stack direction="row" width="fit-content" gap={2} p={2}>
        {allLists &&
          allLists.map((list) => (
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
