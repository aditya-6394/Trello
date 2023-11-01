import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
import {
  getCheckitems,
  putCheckitem,
  deleteCheckitem,
  setError,
  setLoading,
  updateCheckitems,
} from "../../features/checkitems/checkitemsSlice";

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
    throw new Error(error);
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
    throw new Error(error);
  }
};

// Function to delete a check item by its ID
const deleteCheckItemById = async (checklistId, checkItemId) => {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkItemId}?key=${KEY}&token=${TOKEN}`
    );

    return response;
  } catch (error) {
    console.error("Error deleting check item:", error);
    throw new Error(error);
  }
};

function ShowChecklist({ checklist, deleteChecklistById }) {
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    fetchCheckItems(checklist.id)
      .then((data) => {
        dispatch(
          getCheckitems({ checklistId: checklist.id, checkitems: data })
        );
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        showBoundary(error);
        setError(error.message);
      });
  }, []);

  const handleItemToggle = (idChecklist) => {
    fetchCheckItems(idChecklist)
      .then((checkitems) => {
        dispatch(
          updateCheckitems({
            checklistId: idChecklist,
            updatedCheckItemsList: checkitems,
          })
        );
      })
      .catch((error) => showBoundary(error));
  };

  const handleCheckItemCreation = (checklistId, name) => {
    createCheckItem(checklistId, name)
      .then((checkitem) => {
        dispatch(putCheckitem({ checklistId, checkitem }));
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        showBoundary(error);
      });
  };

  const handleCheckItemDeletion = (checklistId, checkItemId) => {
    deleteCheckItemById(checklistId, checkItemId)
      .then((data) => {
        const updatedCheckItemsList = checkItems.filter((item) => {
          return item.id !== checkItemId;
        });
        dispatch(deleteCheckitem({ checklistId, updatedCheckItemsList }));
      })
      .catch((error) => showBoundary(error));
  };

  const checkItems = useSelector(
    (state) => state.checkItems.checkItems[checklist.id]
  );

  const allCheckItems = useSelector((state) => state.checkItems.checkItems);

  const checkedItems =
    checkItems && checkItems.filter((item) => item.state == "complete").length;

  const totalItems = checkItems && checkItems.length;

  return (
    checkItems && (
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
            {checkItems && (
              <CheckItems
                checkItems={checkItems}
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
