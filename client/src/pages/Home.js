import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Home = () => {
  const theme = useTheme();

  return (
    <Box sx={{ px: 3, py: 4, maxWidth: 800, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: "center",
          color: theme.palette.success.main,
        }}
      >
        Welcome to Firefly Lives
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ mb: 2, lineHeight: 1.6, textAlign: "center" }}
      >
        Share, connect, and heal through voice and text with others who understand sibling loss.
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 2, lineHeight: 1.6 }}
      >
        You can write about your sibling or talk about them. This is a space for you to reflect, express, and connect — in your own way, at your own pace.
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 2, lineHeight: 1.6 }}
      >
        All posts will be visible after review by a human to avoid bots posting random text or links. 
        We want to make sure this space feels safe and meaningful.
      </Typography>

      <Typography
        variant="body1"
        sx={{ lineHeight: 1.6 }}
      >
        Both written and audio posts will be shown below once they’re approved.
      </Typography>
    </Box>
  );
};

export default Home;
