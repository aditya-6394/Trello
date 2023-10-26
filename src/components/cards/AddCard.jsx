import React, { useState } from "react";

const AddCard = ({ onAddCard }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCardText, setNewCardText] = useState("");

  const handleAddCard = () => {
    if (newCardText.trim() !== "") {
      onAddCard(newCardText);
      setNewCardText("");
      setIsAdding(false);
    }
  };

  return (
    <div>
      {isAdding ? (
        <div>
          <input
            type="text"
            placeholder="Enter card title"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
          />
          <button onClick={handleAddCard}>Add Card</button>
          <span onClick={() => setIsAdding(false)}>Close</span>
        </div>
      ) : (
        <span onClick={() => setIsAdding(true)}>+ Add a card</span>
      )}
    </div>
  );
};

export default AddCard;
