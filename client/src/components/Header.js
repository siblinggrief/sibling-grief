import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { label: "Home", path: user ? "/" : "/login" },
    { label: "To share", path: "/to-share" },
    { label: "To care", path: "/to-care" },
    { label: "To prepare", path: "/to-prepare" },
    { label: "Self-care", path: "/self-care" },
    { label: "About", path: "/about" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.custom.header }}>
      <Toolbar className={styles.toolbar}>
        {isMobile ? (
          <>
            <Box className={styles.mobileLeft}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <img src="/logo.jpg" alt="Firefly Lives" className={styles.logoImage} />
              <Typography variant="h6" noWrap>
                Firefly Lives
              </Typography>
            </Box>
            <Box className={styles.mobileRight}>
              <IconButton
                color="inherit"
                aria-label="to-share"
                onClick={() => navigate("/to-share")}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="subscribe"
                onClick={() => navigate("/subscribe")}
              >
                <EmailIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <SearchIcon />
              </IconButton>
            </Box>
            {showSearch && (
              <Box className={styles.mobileSearchWrapper}>
                <InputBase
                  placeholder="Search…"
                  inputProps={{
                    "aria-label": "search",
                    style: { color: theme.palette.text.primary },
                  }}
                  className={styles.searchInput}
                  sx={{
                    "&::placeholder": {
                      color: theme.palette.text.secondary,
                    },
                  }}
                />
              </Box>
            )}
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                {navLinks.map((link) => (
                  <ListItem key={link.label} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(link.path);
                        setDrawerOpen(false);
                      }}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {user && (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleLogout();
                        setDrawerOpen(false);
                      }}
                    >
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Box className={styles.logoContainer}>
              <img src="/logo.jpg" alt="Firefly Lives" className={styles.logoImage} />
              <Typography variant="h6" noWrap>
                Firefly Lives
              </Typography>
            </Box>
            <Box className={styles.navLinks}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? styles.activeNav : styles.navLink
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </Box>
            <Box className={styles.searchWrapper}>
              <InputBase
                placeholder="Search…"
                inputProps={{
                  "aria-label": "search",
                  style: { color: theme.palette.text.primary },
                }}
                className={styles.searchInput}
                sx={{
                  "&::placeholder": {
                    color: theme.palette.text.secondary,
                  },
                }}
              />
              <IconButton type="submit" size="small" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>
            {user && (
              <Box>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  Logout
                </Button>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
