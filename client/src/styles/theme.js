import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B4332", // Forest Green
    },
    secondary: {
      main: "#2D6A4F", // Slightly lighter green
    },
    error: {
      main: "#B00020",
    },
    background: {
      default: "#121212",
      paper: "#1D1D1D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A9D6C6",
    },
    action: {
      hover: "#2D6A4F",
    },
    custom: {
      header: "#163526", // Slightly darker than #1B4332
    },
  },
});

export default theme;
