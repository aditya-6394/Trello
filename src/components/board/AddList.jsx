import React, { useState } from "react";
import {
  Button,
  Box,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

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
        <Stack sx={{ rowGap: 1 }}>
          <TextField
            width="100%"
            placeholder="Add an item"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />

          <Box>
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Add
            </Button>
            <IconButton onClick={toggleAdding}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
      ) : (
        <Typography variant="outlined" onClick={toggleAdding}>
          + Add List
        </Typography>
      )}
    </div>
  );
}

export default AddListItem;
