import React from "react";
import ShowChecklist from "./ShowChecklist";

function ShowAllChecklist({ checklists, deleteChecklistById, cardId }) {
  return (
    <>
      {checklists.map((checklist) => (
        <ShowChecklist
          key={checklist.id}
          checklist={checklist}
          deleteChecklistById={deleteChecklistById}
        />
      ))}
    </>
  );
}

export default ShowAllChecklist;
