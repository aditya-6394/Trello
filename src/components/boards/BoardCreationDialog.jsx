import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function FormDialog({ open, handleClose, createBoard }) {
  const [boardName, setBoardName] = useState("");

  const onChangeHandler = (event) => {
    const boardName = event.target.value;
    setBoardName(boardName);
  };

  const handleCreateBoard = (e) => {
    createBoard(boardName);
    handleClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Create Board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Board title"
            type="text"
            fullWidth
            variant="standard"
            required
            value={boardName}
            onChange={(e) => onChangeHandler(e)}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={(e) => handleClose(e)}>Cancel</Button>
          <Button onClick={(e) => handleCreateBoard(e)}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
