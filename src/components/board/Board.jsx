import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { ListContext } from "../lists/ListsContextProvider";
import CardsList from "../cards/CardsList";
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
      {/* Form for adding a new list */}
      <div>
        <TextField
          label="New List Name"
          variant="outlined"
          value={newListName}
          onChange={handleNewListNameChange}
        />
        <Button onClick={handleCreateList}>Add List</Button>
      </div>

      {/* Existing lists */}
      {lists.map((list) => (
        <ListDisplay
          key={list.id}
          list={list}
          onDeleteList={handleDeleteList}
        />
      ))}
    </Grid>
  );
}

export default Board;
