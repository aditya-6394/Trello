import React, { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { Grid, Box, Typography, Container } from "@mui/material";
import FormDialog from "./BoardCreationDialog";
import CreateBoardBox from "./CreateBoardBox";
import CircularIndeterminate from "../errorAndLoading/Loading";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  getBoards,
  putBoard,
  setLoading,
  setError,
} from "../../features/boards/boardsSlice";

const TOKEN = import.meta.env.VITE_TOKEN;
const KEY = import.meta.env.VITE_API_KEY;

async function getAllBoards() {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

function Boards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllBoards()
      .then((allBoards) => {
        dispatch(getBoards(allBoards));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        setError(error);
        showBoundary(error);
      });
  }, []);

  const allBoards = useSelector((state) => state.boards.allBoards);

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

      dispatch(putBoard(createdBoard));

      handleClose();
    } catch (error) {
      throw new Error(error);
    }
  };

  const loading = useSelector((state) => state.boards.loading);

  return (
    <Container>
      {loading && <CircularIndeterminate />}
      {!loading && (
        <Box>
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
              <CreateBoardBox handleClickOpen={handleClickOpen} />
            </Grid>
          </Grid>
          <FormDialog
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            open={open}
            setOpen={setOpen}
            createBoard={createBoard}
          />
        </Box>
      )}
    </Container>
  );
}

export default Boards;
