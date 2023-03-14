// modules
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
    display={'flex'} alignItems={'center'} justifyContent={{xs: 'center', sm: 'right'}}
    padding={'0 1vw'}
    color={'white'}
      sx={{
        width: "98vw",
        height: 40,
        backgroundColor: "primary.dark",
        // border: 1,
        // '&:hover': {
        //   backgroundColor: 'primary.main',
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}
      position={"absolute"}
      bottom={"0px"}
    >
      <Typography variant="body2" >&copy; Sankha Rathnayake 2023</Typography>
    </Box>
  );
};

export default Footer;
