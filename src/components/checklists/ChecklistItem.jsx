import React, { useContext, useState } from "react";
import { ChecklistContext } from "./ChecklistContextProvider";

function ChecklistItem({ checklist }) {
  const { updateChecklist, createChecklist, deleteChecklistById } =
    useContext(ChecklistContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(checklist.name);
  const [newChecklistName, setNewChecklistName] = useState(""); // State for new checklist name

  const handleUpdate = () => {
    updateChecklist(checklist.id, newName);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteChecklistById(checklist.id);
  };

  const handleCreateChecklist = () => {
    const cardId = checklist.idCard; // You may need to adjust this to obtain the card ID
    createChecklist(cardId, newChecklistName); // Create a new checklist with the specified name
    setNewChecklistName(""); // Reset the new checklist name field
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <span>{checklist.name}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>

      {/* Create new checklist input and button */}
      <div>
        <input
          type="text"
          value={newChecklistName}
          onChange={(e) => setNewChecklistName(e.target.value)}
          placeholder="New Checklist Name"
        />
        <button onClick={handleCreateChecklist}>Create Checklist</button>
      </div>
    </div>
  );
}

export default ChecklistItem;
