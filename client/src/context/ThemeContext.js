import React, { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/theme'; // your theme function

const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  // On mount, load saved mode or fallback to system preference
  useEffect(() => {
    const saved = localStorage.getItem('appTheme');
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('appTheme', newMode);
      return newMode;
    });
  }, []);

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
