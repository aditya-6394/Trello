import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, TextField, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { ListContext } from "../lists/ListsContextProvider";
import ListDisplay from "../lists/ListDisplay";

function Board() {
  const { id } = useParams();
  const [newListName, setNewListName] = useState("");
  const { lists, fetchLists, createList, deleteListById } =
    useContext(ListContext);
  useEffect(() => {
    fetchLists(id);
  }, [id]);

  const handleDeleteList = (listId) => {
    deleteListById(listId);
  };

  const handleNewListNameChange = (event) => {
    setNewListName(event.target.value);
  };

  const handleCreateList = () => {
    if (newListName.trim() !== "") {
      createList(id, newListName);
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
        {lists.map((list) => (
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
