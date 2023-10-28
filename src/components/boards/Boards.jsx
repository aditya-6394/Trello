import React, { useEffect, useReducer } from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormDialog from "./BoardCreationDialog";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

async function getAllBoards() {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// const boardBackground = {};
// if (allBoards) {
//   allBoards.forEach((board) => {
//     boardBackground[board.id] = {
//       backgroundColor: board.prefs.backgroundColor,
//       backgroundImage: board.prefs.backgroundImage,
//     };
//   });
// }

const initialState = {
  allBoards: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "get":
      return { allBoards: action.payload };
    case "post":
      return { allBoards: [...state.allBoards, action.payload] };
  }
};

function Boards() {
  const [state, dispatcher] = useReducer(reducer, initialState);

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBoards().then((allBoards) => {
      dispatcher({ type: "get", payload: allBoards });
    });
  }, []);

  const handleClickOpen = (e) => {
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
      const createdBoard = response.data;
      dispatcher({ type: "post", payload: createdBoard });

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Grid container sx={{ marginTop: "2rem" }}>
        {state.allBoards
          ? state.allBoards.map((board, index) => {
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
                    sx={{
                      backgroundColor: board.prefs.backgroundColor,
                      backgroundImage: `url('${board.prefs.backgroundImage}')`,
                      "&:hover": { cursor: "pointer" },
                    }}
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
            onClick={() => {
              handleClickOpen();
            }}
          >
            <Typography variant="body1">Create a new board</Typography>
          </Box>
        </Grid>
      </Grid>
      <FormDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        createBoard={createBoard}
      />
    </Container>
  );
}

export default Boards;
