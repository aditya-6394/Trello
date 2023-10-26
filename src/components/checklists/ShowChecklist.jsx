import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckItemsContextProvider from "../checkitems/CheckItemsContextProvider";
import AddChecklistItem from "../checkitems/AddChecklistItem";
import CheckItems from "../checkitems/ShowCheckItems";
function ShowChecklist({ checklists, deleteChecklistById }) {
  return (
    <CheckItemsContextProvider>
      {checklists.map((checklist) => (
        <div key={checklist.id}>
          <List>
            <ListItem>
              <ListItemText primary={checklist.name} />
              <IconButton onClick={() => deleteChecklistById(checklist.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            {/* Display the check items for this checklist */}
            <CheckItems checklistId={checklist.id} />
          </List>
          {/* Add the AddChecklistItem component with the checklistId */}
          <AddChecklistItem checklistId={checklist.id} />
        </div>
      ))}
    </CheckItemsContextProvider>
  );
}

export default ShowChecklist;
