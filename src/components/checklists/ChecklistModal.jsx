import React, { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useSelector, useDispatch } from "react-redux";
import {
  getChecklists,
  setLoading,
  putChecklist,
  deleteChecklist,
  setError,
} from "../../features/checklists/checklistsSlice";

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
    throw new Error(error);
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
    throw new Error(error);
  }
};

// Function to delete a checklist by its ID
const deleteChecklistById = async (checklistId) => {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checklistId}?key=${KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

function ChecklistModal({ cardId, isOpen, onClose, card }) {
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();
  const checklists = useSelector(
    (state) => state.checklists.checklists[cardId]
  );

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchChecklists(cardId)
        .then((checkLists) => {
          setLoading(false);
          setError("");
          dispatch(getChecklists({ cardId, checkLists }));
        })
        .catch((error) => {
          showBoundary(error);
          setError(error.message);
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
    createChecklist(cardId, newChecklistName)
      .then((createdChecklist) => {
        dispatch(putChecklist({ cardId, createdChecklist }));
      })
      .catch((error) => showBoundary(error));
  };

  const handleDeleteChecklist = (checklistId) => {
    deleteChecklistById(checklistId)
      .then(() => {
        const updatedList = checklists.filter((checklist) => {
          return checklist.id !== checklistId;
        });
        dispatch(deleteChecklist({ cardId, updatedList }));
      })
      .catch((error) => showBoundary(error));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{card.name}</DialogTitle>
      {checklists && (
        <ShowAllChecklist
          checklists={checklists}
          deleteChecklistById={handleDeleteChecklist}
        />
      )}
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
