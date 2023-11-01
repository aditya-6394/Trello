import React from "react";
import { useErrorBoundary } from "react-error-boundary";

import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const updateCheckItem = async (cardId, idCheckItem, state) => {
  try {
    const TOKEN = import.meta.env.VITE_TOKEN;
    const KEY = import.meta.env.VITE_API_KEY;
    const response = await axios.put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${idCheckItem}?key=${KEY}&token=${TOKEN}&state=${state}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

function CheckItems({
  cardId,
  checkItems,
  onItemToggle,
  handleCheckItemDeletion,
  checklistId,
}) {
  const { showBoundary } = useErrorBoundary();
  const handleCheck = (e) => {
    const state = e.target.checked ? "complete" : "incomplete";
    const cardId = e.target.closest(".check-item").getAttribute("data-idcard");
    const idCheckItem = e.target
      .closest(".check-item")
      .getAttribute("data-iditem");
    updateCheckItem(cardId, idCheckItem, state)
      .then((data) => {
        onItemToggle(data.idChecklist);
      })
      .catch((error) => showBoundary(error));
  };

  return (
    checkItems && (
      <List sx={{ width: "100%" }}>
        {checkItems.map((checkItem) => (
          <div key={checkItem.id}>
            <ListItem>
              <Checkbox
                data-iditem={checkItem.id}
                data-idcard={cardId}
                data-idcheckitem={checkItem.id}
                className="check-item"
                checked={checkItem.state === "complete"}
                onChange={(e) => handleCheck(e)}
              />
              <ListItemText primary={checkItem.name} />
              <IconButton
                onClick={() =>
                  handleCheckItemDeletion(checklistId, checkItem.id)
                }
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </div>
        ))}
      </List>
    )
  );
}

export default CheckItems;
