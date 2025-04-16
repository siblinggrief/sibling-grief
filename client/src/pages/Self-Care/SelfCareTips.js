import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";

const hoverScale = keyframes`
  from {
    transform: scale(1);
    box-shadow: none;
  }
  to {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const SelfCareTips = () => {
  const theme = useTheme();

  const tips = [
    {
      title: "Journaling",
      description:
        "Writing down thoughts and feelings can be a great outlet.",
    },
    {
      title: "Creative Expression",
      description:
        "Engaging in art, music, or writing can help process emotions.",
    },
    {
      title: "Physical Activity",
      description:
        "Exercise can release built-up tension and provide a sense of relief.",
    },
    {
      title: "Memorializing",
      description:
        "Creating a scrapbook, planting a tree, or finding other ways to honor their sibling’s memory.",
    },
    {
      title: "Talking to Someone",
      description:
        "Sharing feelings with a trusted friend, family member, or counselor.",
    },
    {
      title: "Breathwork/Meditation",
      description:
        "Practicing different type of breathwork can help manage overwhelming emotions.",
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      {tips.map((tip, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: theme.palette.success.main }}
          >
            {index + 1}. {tip.title}
          </Typography>
          <Typography variant="body2">{tip.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SelfCareTips;
