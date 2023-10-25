import React, { useContext, useEffect, useState } from "react";
// import { ChecklistContext } from "./ChecklistContextProvider";
import { ChecklistContext } from "./ChecklistContextProvider";
// import ChecklistItem from "./ChecklistItem";
import ChecklistItem from "./ChecklistItem";

function ChecklistsList({ cardId }) {
  const { checklists, fetchChecklists } = useContext(ChecklistContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      fetchChecklists(cardId);
      setIsLoaded(true);
    }
  }, [cardId, fetchChecklists, isLoaded]);

  return (
    <div>
      {checklists[cardId] &&
        checklists[cardId].map((checklist) => (
          <ChecklistItem key={checklist.id} checklist={checklist} />
        ))}
    </div>
  );
}

export default ChecklistsList;
