// import React, { useContext, useEffect, useState } from "react";
// import { CardContext } from "./CardContextProvider";
// import Card from "./Card";

// function CardsList({ listId }) {
//   const { cards, fetchCards, deleteCardById } = useContext(CardContext);

//   useEffect(() => {
//     fetchCards(listId);
//   }, [listId]);

//   return (
//     <div>
//       {cards &&
//         cards.map((card) => (
//           <Card
//             key={card.id}
//             card={card}
//             onDelete={() => handleDeleteCard(card.id)}
//           />
//         ))}
//     </div>
//   );
// }

// export default CardsList;

import React, { useContext, useEffect } from "react";
import { CardContext } from "./CardContextProvider";
import Card from "./Card";

function CardsList({ listId }) {
  const { cardsByList, fetchCards, deleteCardById } = useContext(CardContext);
  const cards = cardsByList[listId] || []; // Access cards for the specified list

  useEffect(() => {
    fetchCards(listId);
  }, [listId]);

  return (
    <div>
      {cards &&
        cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={() => deleteCardById(listId, card.id)} // Pass listId for deletion
          />
        ))}
    </div>
  );
}

export default CardsList;
