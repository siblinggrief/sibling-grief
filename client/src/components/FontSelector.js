import { useEffect } from 'react';
import {
  Box, FormControl, InputLabel, Select, MenuItem, Typography, Button
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useAppTheme } from '../context/ThemeContext';
import API_URL from "../config";

const availableFonts = [
  { label: "Libre Baskerville", value: "Libre+Baskerville" },
  { label: "Open Sans", value: "Open+Sans" },
  { label: "Roboto", value: "Roboto" },
  { label: "Lora", value: "Lora" },
  { label: "Merriweather", value: "Merriweather" },
  { label: "Playfair Display", value: "Playfair+Display" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Raleway", value: "Raleway" },
  { label: "Poppins", value: "Poppins" },
  { label: "Work Sans", value: "Work+Sans" },
  { label: "Quicksand", value: "Quicksand" },
  { label: "Nunito", value: "Nunito" },
  { label: "Source Serif Pro", value: "Source+Serif+Pro" },
  { label: "Crimson Text", value: "Crimson+Text" },
  { label: "DM Sans", value: "DM+Sans" }
];

export default function FontSelector({ showSnackbar }) {
  const theme = useTheme();
  const { font, setFont } = useAppTheme();

  // Load all fonts once so they can preview correctly in dropdown
  useEffect(() => {
    const allFonts = availableFonts.map(f => `family=${f.value}`).join("&");
    const fontLink = `https://fonts.googleapis.com/css2?${allFonts}&display=swap`;

    if (!document.querySelector(`link[href="${fontLink}"]`)) {
      const link = document.createElement("link");
      link.href = fontLink;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

const handleSave = async () => {
  if (!font) {
    showSnackbar("No font selected", "error");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/settings/font`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ font })
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Unknown error");
    }

    showSnackbar("Font updated successfully!");
  } catch (error) {
    console.error("Failed to save font:", error);
    showSnackbar(`Failed to update font: ${error.message}`, "error");
  }
};


  return (
    <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6">Font Settings</Typography>
      <FormControl sx={{ mt: 2, minWidth: 250 }}>
        <InputLabel id="font-select-label" sx={{ color: theme.palette.custom.mediumGreen }}>
          Select Font
        </InputLabel>
        <Select
          labelId="font-select-label"
          label="Select Font"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          {availableFonts.map((f) => (
            <MenuItem
              key={f.value}
              value={f.value}
              sx={{
                fontFamily: `'${f.label}', serif`
              }}
            >
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={handleSave}
        variant="contained"
        sx={{
          backgroundColor: theme.palette.custom.darkGreen,
          color: theme.palette.custom.white,
          "&:hover": { backgroundColor: theme.palette.custom.mediumGreen },
          textTransform: "none",
          fontWeight: 400,
          marginTop: 3,
          marginLeft: 4
        }}
      >
        Save
      </Button>
    </Box>
  );
}
