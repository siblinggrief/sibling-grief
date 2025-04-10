import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#14532d", // Dark Green
    },
    secondary: {
      main: "#1e7a40", // Lighter Green
    },
    error: {
      main: "#888888", // Replacing red with mid-grey
    },
    background: {
      default: "#1e1e1e", // Deep grey
      paper: "#2a2a2a",   // Slightly lighter grey
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A5D6A7", // Light greenish-grey
    },
    action: {
      hover: "#355e42",           // Dark green-grey
      disabledBackground: "#3d3d3d", // Grey background for disabled buttons
      disabled: "#bbbbbb",            // Light grey text when disabled
    },
    custom: {
      header: "#0e3b25", // Very dark green for AppBar
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "darkContained" },
          style: {
            backgroundColor: "#2e7d32", // Rich green
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
            "&.Mui-disabled": {
              backgroundColor: "#444", // Greyed out
              color: "#bbb",
            },
          },
        },
      ],
    },
  },
});

export default theme;
