import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/theme'; // unified theme function

const ThemeContext = createContext();

export const useAppTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('appTheme');
    if (saved) setMode(saved);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('appTheme', newMode);
  };

  const muiTheme = useMemo(() => theme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
