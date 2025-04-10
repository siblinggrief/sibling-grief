import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.custom.header }}>
      <Toolbar>
        <Typography variant="h6">Sibling Grief Support</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;