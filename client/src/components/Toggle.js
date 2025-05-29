import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useAppTheme } from '../context/ThemeContext';

const Toggle = () => {
  const { mode, toggleTheme } = useAppTheme();
  const theme = useTheme();

  // Choose icon color for contrast
  const iconColor = theme.palette.custom.lightGreen;

  return (
    <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={toggleTheme}
        aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
        size="large"
      >
        {mode === 'dark' ? (
          <ToggleOnIcon sx={{ fontSize: 35, color: iconColor }} />
        ) : (
          <ToggleOffIcon sx={{ fontSize: 35, color: iconColor }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Toggle;
