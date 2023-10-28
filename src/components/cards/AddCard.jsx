import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function AddCard({ handleAddElement }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCardText, setNewCardText] = useState("");

  const handleElementAddition = () => {
    if (newCardText.trim() !== "") {
      handleAddElement(newCardText);
      setNewCardText("");
      setIsAdding(false);
    }
  };

  return (
    <Box>
      {isAdding ? (
        <Box>
          <TextField
            label="Enter card title"
            variant="outlined"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleElementAddition}
          >
            Add Card
          </Button>
          <Typography variant="body2" onClick={() => setIsAdding(false)}>
            Close
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" onClick={() => setIsAdding(true)}>
          + Add a card
        </Typography>
      )}
    </Box>
  );
}

export default AddCard;
