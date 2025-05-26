import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useAppTheme } from '../context/ThemeContext';

const Toggle = () => {
  const { mode, toggleTheme } = useAppTheme();

  return (
    <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
      <IconButton onClick={toggleTheme}>
        {mode === 'dark' ? (
          <ToggleOnIcon sx={{ fontSize: 50, color: 'white' }} />
        ) : (
          <ToggleOffIcon sx={{ fontSize: 50, color: 'black' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Toggle;
