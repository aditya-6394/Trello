import React, { useContext, useEffect, useState, useReducer } from "react";
import { Dialog, DialogTitle, Button } from "@mui/material";
import ChecklistPopover from "./CreateChecklistPopover";
import ShowAllChecklist from "./ShowAllChecklists";

import axios from "axios";
const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

//  Function to fetch checklists for a specific card
const fetchChecklists = async (cardId) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching checklists:", error);
  }
};

// Function to create a new checklist for a card
const createChecklist = async (cardId, name) => {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/checklists?key=${KEY}&token=${TOKEN}`,
      {
        idCard: cardId,
        name: name,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating checklist:", error);
  }
};

// Function to delete a checklist by its ID
const deleteChecklistById = async (checklistId) => {
  try {
    const TOKEN = import.meta.env.VITE_TOKEN;
    const KEY = import.meta.env.VITE_API_KEY;
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checklistId}?key=${KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting checklist:", error);
  }
};

const inititalState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "get":
      return action.payload;
    case "create":
      return [...state, action.payload];
    case "delete":
      return action.payload;
  }
};

function ChecklistModal({ cardId, isOpen, onClose }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [state, dispatch] = useReducer(reducer, inititalState);

  useEffect(() => {
    if (isOpen) {
      fetchChecklists(cardId).then((checkLists) => {
        dispatch({ type: "get", payload: checkLists });
      });
    }
  }, [cardId, isOpen]);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleCreateChecklist = (newChecklistName) => {
    createChecklist(cardId, newChecklistName).then((createdChecklist) => {
      dispatch({ type: "create", payload: createdChecklist });
    });
  };

  const handleDeleteChecklist = (checklistId) => {
    deleteChecklistById(checklistId).then(() => {
      const updatedList = state.filter((checklist) => {
        return checklist.id !== checklistId;
      });
      dispatch({ type: "delete", payload: updatedList });
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Checklists for the Card</DialogTitle>
      <ShowAllChecklist
        checklists={state}
        deleteChecklistById={handleDeleteChecklist}
      />
      <Button onClick={openPopover}>Add Checklist</Button>
      <ChecklistPopover
        isOpen={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePopover}
        onSubmit={handleCreateChecklist}
      />
    </Dialog>
  );
}

export default ChecklistModal;
