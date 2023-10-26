import React from "react";
import CheckItemsContextProvider from "../checkitems/CheckItemsContextProvider";
import ShowChecklist from "./ShowChecklist";

function ShowAllChecklist({ checklists, deleteChecklistById, cardId }) {
  console.log(checklists);
  return (
    <CheckItemsContextProvider>
      {checklists.map((checklist) => (
        <ShowChecklist
          key={checklist.id}
          checklist={checklist}
          deleteChecklistById={deleteChecklistById}
        />
      ))}
    </CheckItemsContextProvider>
  );
}

export default ShowAllChecklist;
