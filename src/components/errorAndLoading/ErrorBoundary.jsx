import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Box, Typography, Grid } from "@mui/material";

function ErrorFallback({ error }) {
  return (
    <Grid
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h2">Something went wrong</Typography>
        <Typography variant="h5">{error.message}</Typography>
      </Box>
    </Grid>
  );
}

function MyErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

export default MyErrorBoundary;
