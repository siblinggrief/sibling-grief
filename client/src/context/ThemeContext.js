import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../styles/theme";
import API_URL from "../config";

const ThemeContext = createContext({
  mode: "dark",
  toggleTheme: () => {},
  font: "Libre+Baskerville",
  setFont: () => {}
});

export const useAppTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const [font, setFont] = useState("Libre+Baskerville");

  // Load theme preference from local storage (light/dark)
  useEffect(() => {
    const saved = localStorage.getItem("appTheme");
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(prefersDark ? "dark" : "light");
    }
  }, []);

  // Load font setting from backend
  useEffect(() => {
    fetch(`${API_URL}/api/settings/font`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.font) setFont(data.font);
      })
      .catch((err) => console.error("Failed to load font:", err));
  }, []);

  // Dynamically load Google Font & apply to body
  useEffect(() => {
    if (!font) return;
    const fontName = font.replace(/\+/g, " "); // For CSS
    const fontLink = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;

    // Avoid duplicate font loading
    if (!document.querySelector(`link[href="${fontLink}"]`)) {
      const link = document.createElement("link");
      link.href = fontLink;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    document.body.style.fontFamily = `'${fontName}', serif`;
  }, [font]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("appTheme", newMode);
      return newMode;
    });
  }, []);

  const muiTheme = useMemo(() => theme(mode, font), [mode, font]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, font, setFont }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
