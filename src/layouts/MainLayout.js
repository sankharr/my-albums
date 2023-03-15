import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));
const Container = React.lazy(() => import("@mui/material/Container"));

const MainLayout = () => {
  const [sortOrder, setSortOrder] = useState("Title ASC");
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      maxWidth={"xl"}
      disableGutters={true}
    >
      <Header updateSortOrder={setSortOrder} />
      <Outlet context={[sortOrder, setSortOrder]} />
      <Footer />
    </Container>
  );
};

export default MainLayout;
