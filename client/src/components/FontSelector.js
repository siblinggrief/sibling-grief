import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button
} from '@mui/material';
import { useTheme } from "@mui/material/styles";

const availableFonts = [
  { label: 'Libre Baskerville', value: 'Libre+Baskerville' },
  { label: 'Open Sans', value: 'Open+Sans' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Lora', value: 'Lora' },
  { label: 'Merriweather', value: 'Merriweather' },
  { label: 'Playfair Display', value: 'Playfair+Display' },
  { label: 'Montserrat', value: 'Montserrat' },
  { label: 'Raleway', value: 'Raleway' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Work Sans', value: 'Work+Sans' },
  { label: 'Quicksand', value: 'Quicksand' },
  { label: 'Nunito', value: 'Nunito' },
  { label: 'Source Serif Pro', value: 'Source+Serif+Pro' },
  { label: 'Crimson Text', value: 'Crimson+Text' },
  { label: 'DM Sans', value: 'DM+Sans' }
];

export default function FontSelector({ showSnackbar }) {
  const [selectedFont, setSelectedFont] = useState(
    localStorage.getItem('selectedFont') || 'Libre+Baskerville'
  );
  const theme = useTheme();

  // Load preview fonts once when component mounts
  useEffect(() => {
    const linkId = 'preview-google-fonts';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href =
        `https://fonts.googleapis.com/css2?` +
        availableFonts.map(f => `family=${f.value}`).join('&') +
        `&display=swap`;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    applyFont(selectedFont);
  }, [selectedFont]);

  const applyFont = (font) => {
    const linkId = 'dynamic-google-font';
    let link = document.getElementById(linkId);
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;

    document.body.style.fontFamily = `"${font.replace(/\+/g, ' ')}", serif`;
    localStorage.setItem('selectedFont', font);
  };

  const handleSave = () => {
    // TODO: Save to backend for global effect
    showSnackbar('Font updated successfully!');
  };

  return (
    <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">Font Settings</Typography>
      <FormControl sx={{ mt: 2, minWidth: 250 }}>
        <InputLabel id="font-select-label" sx={{ color: theme.palette.custom.mediumGreen }}>
          Select Font
        </InputLabel>
        <Select
          labelId="font-select-label"
          label="Select Font"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 400 }
            }
          }}
        >
          {availableFonts.map((font) => (
            <MenuItem
              key={font.value}
              value={font.value}
              sx={{
                fontFamily: `"${font.label}", serif`,
                fontSize: '1rem'
              }}
            >
              {font.label}
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
          "&:hover": {
            backgroundColor: theme.palette.custom.mediumGreen
          },
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
