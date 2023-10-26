import React, { useState } from "react";
import {
  Popover,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function ChecklistPopover({ isOpen, anchorEl, onClose, onSubmit }) {
  const [newChecklistName, setNewChecklistName] = useState("");

  const handleCreateChecklist = () => {
    if (newChecklistName) {
      onSubmit(newChecklistName);
      setNewChecklistName("");
      onClose();
    }
  };

  return (
    <Popover open={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <Box p={2}>
        <Typography variant="h6">Add Checklist</Typography>
        <TextField
          label="Checklist Title"
          variant="outlined"
          value={newChecklistName}
          onChange={(e) => setNewChecklistName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateChecklist}
        >
          Add
        </Button>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Popover>
  );
}

export default ChecklistPopover;
