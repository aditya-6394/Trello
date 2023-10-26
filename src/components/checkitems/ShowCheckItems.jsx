// import React, { useContext } from "react";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Checkbox,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { CheckItemsContext } from "./CheckItemsContextProvider";

// function CheckItems({ checklistId, cardId }) {
//   const { checkItems, deleteCheckItemById, fetchChecklists } =
//     useContext(CheckItemsContext);

//   const items = checkItems[checklistId] || [];

//   return (
//     <List sx={{ width: "100%" }}>
//       {items.map((checkItem) => (
//         <div key={checkItem.id}>
//           <ListItem
//             data-listId={checklistId}
//             data-cardid={cardId}
//             data-idcheckitem={checkItem.id}
//           >
//             <Checkbox className="check-list-item-checkbox" />
//             <ListItemText primary={checkItem.name} />
//             <IconButton
//               onClick={() => deleteCheckItemById(checklistId, checkItem.id)}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </ListItem>
//         </div>
//       ))}
//     </List>
//   );
// }

// export default CheckItems;

import React, { useContext, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckItemsContext } from "./CheckItemsContextProvider";

function CheckItems({ checklistId, cardId }) {
  const { checkItems, deleteCheckItemById, fetchCheckItems } =
    useContext(CheckItemsContext);
  const items = checkItems[checklistId] || [];

  useEffect(() => {
    fetchCheckItems(checklistId);
  }, [checklistId]);

  return (
    <List sx={{ width: "100%" }}>
      {items.map((checkItem) => (
        <div key={checkItem.id}>
          <ListItem
            data-listId={checklistId}
            data-cardId={cardId}
            data-idCheckItem={checkItem.id}
          >
            <Checkbox className="check-list-item-checkbox" />
            <ListItemText primary={checkItem.name} />
            <IconButton
              onClick={() => deleteCheckItemById(checklistId, checkItem.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </div>
      ))}
    </List>
  );
}

export default CheckItems;
