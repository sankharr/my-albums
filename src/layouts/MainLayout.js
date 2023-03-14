import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Container } from "@mui/material";

const MainLayout = () => {
  return (
    <Container sx={{ height: '100vh'}} maxWidth={"xl"} disableGutters='true' >
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default MainLayout;
