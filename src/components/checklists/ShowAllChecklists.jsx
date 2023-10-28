import React from "react";
import CheckItemsContextProvider from "../checkitems/CheckItemsContextProvider";
import ShowChecklist from "./ShowChecklist";

function ShowAllChecklist({ checklists, deleteChecklistById, cardId }) {
  return (
    checklists.length > 0 && (
      <CheckItemsContextProvider>
        {checklists.map((checklist) => (
          <ShowChecklist
            key={checklist.id}
            checklist={checklist}
            deleteChecklistById={deleteChecklistById}
          />
        ))}
      </CheckItemsContextProvider>
    )
  );
}

export default ShowAllChecklist;
