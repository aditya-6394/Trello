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
import LinearWithValueLabel from "./ProgressBar";
function ShowChecklist({ checklists, deleteChecklistById, cardId }) {
  return (
    <CheckItemsContextProvider>
      {checklists.map((checklist) => (
        <div key={checklist.id}>
          <List>
            {/* Displaying List Name & Delete Button */}
            <ListItem>
              <ListItemText primary={checklist.name} />
              <IconButton onClick={() => deleteChecklistById(checklist.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>

            {/* For Progress Bar */}
            <ListItem>
              <LinearWithValueLabel />
            </ListItem>

            {/* Display the check items for this checklist */}
            <ListItem>
              <CheckItems checklistId={checklist.id} cardId={cardId} />
            </ListItem>

            {/* For adding a Check-List-Item in a Check-List */}
            <ListItem>
              <AddChecklistItem checklistId={checklist.id} />
            </ListItem>
          </List>
        </div>
      ))}
    </CheckItemsContextProvider>
  );
}

export default ShowChecklist;
