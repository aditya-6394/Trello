import React from "react";
import axios from "axios";
import { useState, useEffect, useContext, useReducer } from "react";

import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import AddChecklistItem from "../checkitems/AddChecklistItem";
import CheckItems from "../checkitems/ShowCheckItems";
import LinearWithValueLabel from "./ProgressBar";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

const fetchCheckItems = async (checklistId) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching check items:", error);
  }
};

// Create a check item inside a checklist
const createCheckItem = async (checklistId, name) => {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${KEY}&token=${TOKEN}&name=${name}`
    );

    return response.data;
  } catch (error) {
    console.error("Error creating check item:", error);
  }
};

// Function to delete a check item by its ID
const deleteCheckItemById = async (checklistId, checkItemId) => {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkItemId}?key=${KEY}&token=${TOKEN}`
    );
    console.log("Form deleting");
    return response;
  } catch (error) {
    console.error("Error deleting check item:", error);
  }
};

const inititalState = {
  checkItems: [],
};

const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "fetch":
      return { checkItems: action.payload };
    case "update":
      return { checkItems: [...action.payload] };
    case "create":
      return { checkItems: [...state.checkItems, action.payload] };
    case "delete":
      return { checkItems: [...action.payload] };
    default:
      return state;
  }
};

function ShowChecklist({ checklist, deleteChecklistById }) {
  const [state, dispatch] = useReducer(reducer, inititalState);

  useEffect(() => {
    fetchCheckItems(checklist.id).then((data) => {
      dispatch({ type: "fetch", payload: data });
    });
  }, []);

  const handleItemToggle = (itemId) => {
    const updatedItems = state.checkItems.map((item) => {
      if (item.id == itemId) {
        item.state = item.state === "complete" ? "incomplete" : "complete";
      }
      return item;
    });

    dispatch({ type: "update", payload: updatedItems });
  };

  const handleCheckItemCreation = (checklistId, name) => {
    createCheckItem(checklistId, name).then((item) => {
      dispatch({ type: "create", payload: item });
    });
  };

  const handleCheckItemDeletion = (checklistId, checkItemId) => {
    deleteCheckItemById(checklistId, checkItemId).then((data) => {
      console.log("HandlecheckItemDelete");
      const updatedCheckItemsList = state.checkItems.filter((item) => {
        return item.id !== checkItemId;
      });
      dispatch({ type: "delete", payload: updatedCheckItemsList });
    });
  };

  const checkedItems = state.checkItems.filter(
    (item) => item.state == "complete"
  ).length;

  const totalItems = state.checkItems.length;

  return (
    state.checkItems && (
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
            {state.checkItems && (
              <CheckItems
                checkItems={state.checkItems}
                onItemToggle={handleItemToggle}
                cardId={checklist.idCard}
                checklistId={checklist.id}
                handleCheckItemDeletion={handleCheckItemDeletion}
              />
            )}
          </ListItem>

          <ListItem>
            <AddChecklistItem
              checklistId={checklist.id}
              createCheckItem={handleCheckItemCreation}
            />
          </ListItem>
        </List>
      </div>
    )
  );
}

export default ShowChecklist;
