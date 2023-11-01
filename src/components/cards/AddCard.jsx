import React, { useState } from "react";
import { TextField, Button, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
        <Box sx={{ width: "100%" }}>
          <TextField
            label="Enter card title"
            variant="outlined"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            sx={{ width: "100%", marginBottom: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleElementAddition}
          >
            Add Card
          </Button>
          <IconButton onClick={() => setIsAdding(false)}>
            <CloseIcon />
          </IconButton>
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
