import React, { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";

const MainLayout = () => {

    const [sortOrder, setSortOrder] = useState("Title ASC");
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100vh'}} maxWidth={"xl"} disableGutters={true} >
      <Header updateSortOrder={setSortOrder}/>
      <Outlet context={[sortOrder, setSortOrder]}/>
      <Footer />
    </Container>
  );
};

export default MainLayout;
