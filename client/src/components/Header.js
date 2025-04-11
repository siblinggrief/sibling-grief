import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.custom.header }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Sibling Grief Support</Typography>

        {user && (
          <Box>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
