import React, { useContext } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckItemsContext } from "./CheckItemsContextProvider";

function CheckItems({ checklistId }) {
  const { checkItems, deleteCheckItemById } = useContext(CheckItemsContext);
  const items = checkItems[checklistId] || [];

  return (
    <List>
      {items.map((checkItem) => (
        <div key={checkItem.id}>
          <ListItem>
            <ListItemText primary={checkItem.name} />
            <IconButton
              onClick={() => deleteCheckItemById(checklistId, checkItem.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </div>
      ))}
    </List>
  );
}

export default CheckItems;
