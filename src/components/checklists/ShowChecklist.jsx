import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ShowChecklist({ checklists, deleteChecklistById }) {
  return (
    <List>
      {checklists.map((checklist) => (
        <ListItem key={checklist.id}>
          <ListItemText primary={checklist.name} />
          <IconButton onClick={() => deleteChecklistById(checklist.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default ShowChecklist;
