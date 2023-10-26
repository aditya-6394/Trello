import React, { useState } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistModal from "../checklists/ChecklistModal";

function Card({ card, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    card && (
      <Stack
        direction="row"
        mb={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "0.4rem",
          "&:hover": {
            outline: "2px solid red",
            cursor: "pointer",
            "& .deleteIcon": {
              visibility: "visible",
            },
          },
        }}
        id={card.id}
        key={card.id}
        className="card"
      >
        <Typography variant="h6" onClick={openModal}>
          {card.name}
        </Typography>
        <IconButton p={2} onClick={onDelete} className="deleteIcon">
          <DeleteIcon />
        </IconButton>
        <ChecklistModal
          cardId={card.id}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </Stack>
    )
  );
}

export default Card;
