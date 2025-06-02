import { lightGreen } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const commonColors = {
  darkGreen: '#0e3b25',
  mediumGreen: '#14532d',
  lightGreen: '#6fa070',
  darkGrey: '#3d3d3d',
  grey: '#888888',
  white: '#ffffff',
  black: '#000000',
  // Add more custom colors here if needed
};

const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#121212",
            },
            text: {
              primary: "#ffffff",
              secondary: commonColors.darkGreen,
            },
            custom: {
              darkGreen: commonColors.darkGreen,
              mediumGreen: commonColors.mediumGreen,
              lightGreen: commonColors.lightGreen,
              darkGrey: commonColors.darkGrey,
              grey: commonColors.grey,
              white: commonColors.white,
              black: commonColors.black,
              icon: "#ffffff",
              header: commonColors.darkGreen,
              title: commonColors.lightGreen,
              sidebar: "#1b1b1b",
              button: "#2e7d32",
            },
          }
        : {
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#000000",
              secondary: commonColors.darkGreen,
            },
            custom: {
              darkGreen: commonColors.darkGreen,
              mediumGreen: commonColors.mediumGreen,
              lightGreen: commonColors.lightGreen,
              darkGrey: commonColors.darkGrey,
              grey: commonColors.grey,
              white: commonColors.white,
              black: commonColors.black,
              icon: "#0e3b25",
              header: commonColors.darkGreen,
              title: commonColors.darkGreen,
              sidebar: "#1b1b1b",
              button: "#2e7d32",
            },
          }),
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
  });

export default theme;
