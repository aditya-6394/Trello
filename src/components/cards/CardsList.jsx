import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "./CardContextProvider";
import Card from "./Card";

function CardsList({ listId }) {
  const { cardsByList, fetchCards, deleteCardById, createCard } =
    useContext(CardContext);
  const cards = cardsByList[listId] || [];
  const [isAdding, setIsAdding] = useState(false);
  const [newCardText, setNewCardText] = useState("");

  useEffect(() => {
    fetchCards(listId);
  }, [listId]);

  const handleAddCard = () => {
    if (newCardText.trim() !== "") {
      createCard(listId, newCardText);
      setNewCardText("");
      setIsAdding(false);
    }
  };

  return (
    <>
      <div>
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              onDelete={() => deleteCardById(listId, card.id)}
            />
          );
        })}
      </div>
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
    </>
  );
}

export default CardsList;
