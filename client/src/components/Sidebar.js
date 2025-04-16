// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { Box, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./Sidebar.module.css";
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();
  return (
    <Box className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon className={styles.icon} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>

        <NavLink
          to="/to-share"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <ListItem button>
            <ListItemIcon>
              <AddIcon className={styles.icon} />
            </ListItemIcon>
            <ListItemText primary="To share" />
          </ListItem>
        </NavLink>

        <NavLink
          to="/subscribe"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <ListItem button>
            <ListItemIcon>
              <EmailIcon className={styles.icon} />
            </ListItemIcon>
            <ListItemText primary="Subscribe" />
          </ListItem>
        </NavLink>

      {user && 
       <>
        <div className={styles.sectionHeading}>Topics</div>
          <NavLink
            to="/tag/memories"
            className={({ isActive }) => (isActive ? styles.activeSubLink : styles.subLink)}
          >
            Memories
          </NavLink>
          <NavLink
            to="/tag/stories"
            className={({ isActive }) => (isActive ? styles.activeSubLink : styles.subLink)}
          >
            Stories
          </NavLink>
          <NavLink
            to="/tag/venting"
            className={({ isActive }) => (isActive ? styles.activeSubLink : styles.subLink)}
          >
            Venting
          </NavLink>
          <NavLink
            to="/tag/achievements"
            className={({ isActive }) => (isActive ? styles.activeSubLink : styles.subLink)}
          >
            Achievements
          </NavLink>
          <NavLink
            to="/tag/the-day"
            className={({ isActive }) => (isActive ? styles.activeSubLink : styles.subLink)}
          >
            The day
          </NavLink>
        </>
        }
        <div className={styles.sectionHeading}>Resources</div>
        <NavLink
          to="https://example.com/resource1"
          className={styles.link}
          target="_blank"
        >
          <ListItem button>
            <ListItemText primary="Link 1" />
          </ListItem>
        </NavLink>
        <NavLink
          to="https://example.com/resource2"
          className={styles.link}
          target="_blank"
        >
          <ListItem button>
            <ListItemText primary="Link 2" />
          </ListItem>
        </NavLink>

        <div className={styles.sectionHeading}>Top 5</div>
        <NavLink
          to="/top-5"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          
        </NavLink>
      </nav>
    </Box>
  );
};

export default Sidebar;
