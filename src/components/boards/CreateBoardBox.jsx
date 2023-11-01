import React from "react";
import { Box, Typography } from "@mui/material";
function CreateBoardBox({ handleClickOpen }) {
  return (
    <Box
      className="create-board"
      height="100px"
      borderRadius={1}
      p={1}
      sx={{ backgroundColor: "lightgray" }}
      onClick={() => {
        handleClickOpen();
      }}
    >
      <Typography variant="body1">Create a new board</Typography>
    </Box>
  );
}

export default CreateBoardBox;
