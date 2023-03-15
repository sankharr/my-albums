import { Container } from "@mui/material";
// modules
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: '100vh' }}
    >
      <CircularProgress />
    </Container>
  );
};

export default LoadingPage;
