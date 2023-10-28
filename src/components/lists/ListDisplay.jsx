import React from "react";
import CardsList from "../cards/CardsList";
import { Stack, Paper, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ListDisplay({ list, onDeleteList }) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "272px",
        borderRadius: 2.5,
        padding: 2,
        height: "fit-content",
        backgroundColor: "#ebecf0",
      }}
      className="listItem"
      key={list.id}
    >
      <Box
        className="list-heading"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="p"
          sx={{
            flexBasis: "80%",
            fontWeight: 600,
          }}
        >
          {list.name}
        </Typography>
        <IconButton
          sx={{ flexBasis: "20%" }}
          className="deleteList"
          id={list.id}
          onClick={() => onDeleteList(list.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <CardsList listId={list.id} />
    </Paper>
  );
}

export default ListDisplay;
