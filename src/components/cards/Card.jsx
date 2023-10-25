// Card.js
import React from "react";
import ChecklistsList from "../checklists/ChecklistsList";

function Card({ card, onDelete }) {
  return (
    card && (
      <div>
        <h2>{card.name}</h2>
        {/* Add other card details you want to display */}
        <button onClick={onDelete}>Delete Card</button>
        <ChecklistsList cardId={card.id} />
      </div>
    )
  );
}

export default Card;
