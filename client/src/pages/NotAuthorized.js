// src/pages/NotAuthorized.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const NotAuthorized = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const darkGreen = theme.palette.custom.darkGreen;
  const lightText = theme.palette.grey[100];
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box textAlign="center" mt={10} px={2}>
      <Typography variant="h4" color={isDarkMode ? lightText : darkGreen} gutterBottom>
        Not Authorized
      </Typography>
      <Typography variant="body1" color={isDarkMode ? lightText : "textPrimary"} mb={3}>
        You don’t have permission to view this page.
      </Typography>
      <Button variant="outlined" onClick={() => navigate("/")} 
        sx={{
              backgroundColor: theme.palette.custom.darkGreen,      
              color: theme.palette.custom.white,                 
              "&:hover": {
                backgroundColor: theme.palette.custom.mediumGreen,   
              },
              textTransform: "none",
              fontWeight: 400,
            }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotAuthorized;
