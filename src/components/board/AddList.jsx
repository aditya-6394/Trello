import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

function AddListItem({ id, handleCreateList }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemText, setNewItemText] = useState("");

  const toggleAdding = () => {
    setIsAdding((prev) => !prev);
    setNewItemText("");
  };

  const handleAddItem = () => {
    if (newItemText.trim() !== "") {
      handleCreateList(id, newItemText);
      setNewItemText("");
    }
  };

  return (
    <div>
      {isAdding ? (
        <div>
          <TextField
            placeholder="Add an item"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddItem}>
            Add
          </Button>
          <Button variant="contained" color="secondary" onClick={toggleAdding}>
            Cancel
          </Button>
        </div>
      ) : (
        <Typography variant="outlined" onClick={toggleAdding}>
          + Add List
        </Typography>
      )}
    </div>
  );
}

export default AddListItem;
