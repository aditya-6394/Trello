import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { CheckItemsContext } from "./CheckItemsContextProvider";
function AddChecklistItem({ checklistId }) {
  const { createCheckItem } = useContext(CheckItemsContext);

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
        <Button variant="outlined" onClick={toggleAdding}>
          Add Item
        </Button>
      )}
    </div>
  );
}

export default AddChecklistItem;
