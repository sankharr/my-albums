// modules
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const dropDownOptions = ["Title ASC", "Title DESC"];

const Header = () => {
  const [sortOption, setSortOption] = React.useState(dropDownOptions[0]);

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          My Albums
        </Typography>
        <Box
        // sx={{ display: { xs: "none", sm: "block" } }}
        >
          <FormControl variant="filled" size="small" sx={{color: 'white'}}>
            <InputLabel id="demo-simple-select-label" sx={{color: 'white'}}>Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortOption}
              label="Age"
              onChange={handleChange}
              sx={{color: 'white'}}
            >
              {dropDownOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
