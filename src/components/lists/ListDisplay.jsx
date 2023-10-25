import React from "react";
import { Button } from "@mui/material";
import CardsList from "../cards/CardsList";

function ListDisplay({ list, onDeleteList }) {
  return (
    <div key={list.id}>
      <h1>{list.name}</h1>
      <Button onClick={() => onDeleteList(list.id)}>Delete List</Button>
      <CardsList listId={list.id} />
    </div>
  );
}

export default ListDisplay;
