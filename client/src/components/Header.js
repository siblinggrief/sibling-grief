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
import Toggle from "./Toggle";
import SearchSuggestions from "./SearchSuggestions";

const Header = () => {
  const { user, role } = useAuth();

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
    { label: "To share", path: "/to-share" },
    { label: "To care", path: "/to-care" },
    { label: "To prepare", path: "/to-prepare" },
    { label: "Self-care", path: "/self-care" },
    { label: "About", path: "/about" },
  ];

  return (
    <AppBar position="static" color="default" sx={{ backgroundColor: theme.palette.custom.header, backgroundImage: "none" }}>
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
               <Box
                className={styles.logoClickable}
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                <img src="/logo.jpg" alt="Firefly Lives" className={styles.logoImage} />
                <Typography variant="h6" noWrap>
                  Firefly Lives
                </Typography>
              </Box>
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
              <Box>
              <SearchSuggestions onSelect={(post) => navigate(`/to-share?highlight=${post.id}`)} />
            </Box>
            )}
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                {user && role === "admin" && (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate("/admin");
                      setDrawerOpen(false);
                    }}
                  >
                    <ListItemText primary="Admin" />
                  </ListItemButton>
                </ListItem>
              )}
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
                <ListItem disablePadding>
                  <Box px={2}>
                    <Toggle />
                  </Box>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Box
              className={styles.logoContainer}
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
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
            <Box>
              <SearchSuggestions onSelect={(post) => navigate(`/to-share?highlight=${post.id}`)} />
            </Box>
            <Toggle />
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
