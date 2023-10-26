import React, { useContext, useEffect, useState } from "react";
import { ChecklistContext } from "./ChecklistContextProvider";
import { Dialog, DialogTitle, Button } from "@mui/material";
import ChecklistPopover from "./CreateChecklistPopover";
import ShowChecklist from "./ShowChecklist";

function ChecklistModal({ cardId, isOpen, onClose }) {
  const { checklists, fetchChecklists, createChecklist, deleteChecklistById } =
    useContext(ChecklistContext);

  const cardChecklists = checklists[cardId] || [];

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchChecklists(cardId);
    }
  }, [cardId, isOpen, fetchChecklists]);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleCreateChecklist = (newChecklistName) => {
    createChecklist(cardId, newChecklistName);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Checklists for the Card</DialogTitle>
      <ShowChecklist
        checklists={cardChecklists}
        deleteChecklistById={deleteChecklistById}
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
