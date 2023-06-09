// modules
import React from "react";
const Box = React.lazy(() => import("@mui/material/Box"));
const Typography = React.lazy(() => import("@mui/material/Typography"));

const Footer = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={{ xs: "center", sm: "right" }}
      padding={"0 1vw"}
      color={"white"}
      sx={{
        height: 40,
        backgroundColor: "primary.dark",
      }}
    >
      <Typography variant="body2">&copy; Sankha Rathnayake 2023</Typography>
    </Box>
  );
};

export default Footer;
