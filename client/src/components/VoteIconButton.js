import React from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const VoteIconButton = ({ icon: Icon, color = "inherit", onClick }) => {
  const theme = useTheme();

  return (
    <IconButton
      size="small"
      onClick={onClick}
      sx={{
        color,
        "&:hover": {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Icon />
    </IconButton>
  );
};

export default VoteIconButton;
