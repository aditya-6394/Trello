import React, { useState } from "react";
import { Paper, Typography, IconButton } from "@mui/material";
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
      <Paper
        direction="row"
        sx={{
          marginBottom: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderRadius: "0.8rem",
          paddingX: "0.6rem",
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
        <IconButton
          sx={{ visibility: "hidden" }}
          p={2}
          onClick={() => onDelete(card.id)}
          className="deleteIcon"
        >
          <DeleteIcon />
        </IconButton>
        <ChecklistModal
          card={card}
          cardId={card.id}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </Paper>
    )
  );
}

export default Card;
