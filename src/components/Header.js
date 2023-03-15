// modules
import React from "react";
const AppBar = React.lazy(() => import("@mui/material/AppBar"));
const Box = React.lazy(() => import("@mui/material/Box"));
const Toolbar = React.lazy(() => import("@mui/material/Toolbar"));
const Typography = React.lazy(() => import("@mui/material/Typography"));
const InputLabel = React.lazy(() => import("@mui/material/InputLabel"));
const MenuItem = React.lazy(() => import("@mui/material/MenuItem"));
const FormControl = React.lazy(() => import("@mui/material/FormControl"));
const Select = React.lazy(() => import("@mui/material/Select"));

const dropDownOptions = ["Title ASC", "Title DESC"];

const Header = ({ updateSortOrder }) => {
  const [sortOption, setSortOption] = React.useState(dropDownOptions[0]);

  const handleChange = (event) => {
    setSortOption(event.target.value);
    updateSortOrder(event.target.value);
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
          <FormControl variant="filled" size="small" sx={{ color: "white" }}>
            <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
              Sort By
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortOption}
              label="Age"
              onChange={handleChange}
              sx={{ color: "white" }}
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
