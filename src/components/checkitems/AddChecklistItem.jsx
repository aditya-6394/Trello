import React, { useState } from "react";
import { Button, TextField, Box, Stack } from "@mui/material";

function AddChecklistItem({ checklistId, createCheckItem }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemText, setNewItemText] = useState("");

  const toggleAdding = () => {
    setIsAdding((prev) => !prev);
    setNewItemText("");
  };

  const handleAddItem = () => {
    if (newItemText.trim() !== "") {
      createCheckItem(checklistId, newItemText);
      setNewItemText("");
      toggleAdding();
    }
  };

  return (
    <Stack>
      {isAdding ? (
        <Box>
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
        </Box>
      ) : (
        <Button variant="outlined" onClick={toggleAdding}>
          Add Item
        </Button>
      )}
    </Stack>
  );
}

export default AddChecklistItem;
