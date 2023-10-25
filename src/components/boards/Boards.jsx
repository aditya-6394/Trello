import React, { useContext, useState } from "react";
import { Grid, Box, Stack, Typography, Paper, Container } from "@mui/material";
import { BoardsContext } from "./BoardsContextProvider";
import { useNavigate } from "react-router-dom";
// import FormDialog from "../dialog/Dialog";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

function Boards() {
  const { allBoards, setAllBoards } = useContext(BoardsContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const onClickHandler = (event) => {
    if (event.target.classList.contains("board")) {
      const id = event.target.id;
      navigate(`board/${id}`);
    }
  };

  const createBoard = async (name) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/boards/?name=${name}&key=${KEY}&token=${TOKEN}`
      );

      setAllBoards([...allBoards, response.data]);

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Grid container sx={{ marginTop: "2rem" }}>
        {allBoards
          ? allBoards.map((board, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  p={2}
                  onClick={(e) => onClickHandler(e)}
                >
                  <Box
                    id={board.id}
                    className="board"
                    height="100px"
                    borderRadius={1}
                    p={1}
                    sx={
                      board.prefs.backgroundColor
                        ? {
                            backgroundColor: board.prefs.backgroundColor,
                          }
                        : {
                            backgroundImage: `url('${board.prefs.backgroundImage}')`,
                            backgroundSize: "cover",
                          }
                    }
                  >
                    <Typography variant="h6" color="white">
                      {board.name}
                    </Typography>
                  </Box>
                </Grid>
              );
            })
          : null}
        <Grid item sm={6} md={4} lg={3} xs={12} p={2}>
          <Box
            className="create-board"
            height="100px"
            borderRadius={1}
            p={1}
            sx={{ backgroundColor: "lightgray" }}
            onClick={handleClickOpen}
          >
            <Typography variant="body1">Create a new board</Typography>
          </Box>
        </Grid>
      </Grid>
      {/* <FormDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        createBoard={createBoard}
      /> */}
    </Container>
  );
}

export default Boards;
