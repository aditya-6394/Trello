import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <>
      <Grid
        container
        component="nav"
        sx={{ height: "3rem", display: "flex", alignItems: "center" }}
        px={2}
        py={1}
        gap={1}
      >
        <Grid item height="100%" md={2}>
          <img
            src="../../public/Trello_Logo_assets/Trello Logo assets/2x PNG/Logo/trello-logo-gradient-neutral@2x.png"
            alt=""
            height="100%"
          />
        </Grid>
        <Grid>
          <Button
            type="outlined"
            style={{ fontSize: "1rem", color: "darkgray", padding: 0 }}
            onClick={handleNavigation}
          >
            Boards
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
