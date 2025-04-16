import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.custom.header }}>
      <Toolbar className={styles.toolbar}>
        {/* Left: Logo + Title */}
        <Box className={styles.logoContainer}>
          <img src="/logo.jpg" alt="Firefly Lives" className={styles.logoImage} />
          <Typography variant="h6" noWrap>
            Firefly Lives
          </Typography>
        </Box>

        {/* Middle: Nav + Search */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box className={styles.navLinks}>
            <NavLink
              to={user ? "/" : "/login"}
              className={({ isActive }) => (isActive ? styles.activeNav : styles.navLink)}
            >
              Home
            </NavLink>
            <NavLink
              to="/to-share"
              className={({ isActive }) => (isActive ? styles.activeNav : styles.navLink)}
            >
              To share
            </NavLink>
            <NavLink
              to="/to-care"
              className={({ isActive }) => (isActive ? styles.activeNav : styles.navLink)}
            >
              To care
            </NavLink>
            <NavLink
              to="/to-prepare"
              className={({ isActive }) => (isActive ? styles.activeNav : styles.navLink)}
            >
              To prepare
            </NavLink>
            <NavLink
              to="/self-care"
              className={({ isActive }) => (isActive ? styles.activeNav : styles.navLink)}
            >
              Self-care
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.activeNav : styles.navLink)}
            >
              About
            </NavLink>
          </Box>
          <Box className={styles.searchWrapper}>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              className={styles.searchInput}
            />
            <IconButton type="submit" size="small" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Right: Logout */}
        {user && (
          <Box>
            <Button color="inherit" onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
