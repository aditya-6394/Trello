import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import AddChecklistItem from "../checkitems/AddChecklistItem";
import CheckItems from "../checkitems/ShowCheckItems";
import LinearWithValueLabel from "./ProgressBar";

// import CheckItems from "../checkitems/ShowCheckItems";
import { CheckItemsContext } from "../checkitems/CheckItemsContextProvider";

const fetchCheckItems = async (checklistId) => {
  try {
    const TOKEN = import.meta.env.VITE_TOKEN;
    const KEY = import.meta.env.VITE_API_KEY;
    const response = await axios.get(
      `https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching check items:", error);
  }
};

function ShowChecklist({ checklist, deleteChecklistById }) {
  const [checkListItems, setCheckItems] = useState([]);

  useEffect(() => {
    fetchCheckItems(checklist.id).then((data) => {
      setCheckItems(data);
    });
  }, []);

  const handleItemToggle = (itemId) => {
    const updatedItems = checkListItems.map((item) => {
      if (item.id == itemId) {
        // item.state == "complete" ? "incomplete" : "complete";
        item.state = item.state === "complete" ? "incomplete" : "complete";
      }
      return item;
    });
    console.log("from handle toggle");
    setCheckItems(updatedItems);
  };

  const checkedItems =
    checkListItems &&
    checkListItems.filter((item) => item.state == "complete").length;

  const totalItems = checkListItems.length;
  //   console.log(checklist);
  return (
    checklist && (
      <div key={checklist.id}>
        <List>
          <ListItem>
            <ListItemText primary={checklist.name} />
            <IconButton onClick={() => deleteChecklistById(checklist.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>

          <ListItem>
            <LinearWithValueLabel
              id={checklist.id}
              totalItems={totalItems}
              checkedItems={checkedItems}
            />
          </ListItem>

          <ListItem>
            {checkListItems && (
              <CheckItems
                checkListItems={checkListItems}
                onItemToggle={handleItemToggle}
                cardId={checklist.idCard}
              />
            )}
          </ListItem>

          <ListItem>
            <AddChecklistItem checklistId={checklist.id} />
          </ListItem>
        </List>
      </div>
    )
  );
}

export default ShowChecklist;
