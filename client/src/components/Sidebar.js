// src/components/Sidebar.js
import { NavLink } from "react-router-dom";
import { Box, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import styles from "./Sidebar.module.css";
import { useAuth } from '../context/AuthContext';
import { useTheme } from "@mui/material/styles";
import { usePosts } from '../context/PostsContext';

const Sidebar = () => {
  const { role } = useAuth();
  const theme = useTheme();
  const { posts } = usePosts();

  const sidebarTopics = [
    { label: "Memories", tag: "Memory" },
    { label: "Stories", tag: "Story" },
    { label: "Venting", tag: "Vent" },
    { label: "Achievements", tag: "Achievement" },
    { label: "The Day", tag: "Today" },
  ];   
  
  const top5Posts = [...posts]
    .filter((post) => post.totalReactions > 0)
    .sort((a, b) => b.totalReactions - a.totalReactions)
    .slice(0, 5);
      
  return (
    <Box className={styles.sidebar} sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary}}>
      <nav className={styles.nav}>
        {role === 'admin' && (
           <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            <ListItem button>
            <ListItemIcon>
              <AdminPanelSettingsIcon className={styles.icon} />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
          </NavLink>
      )}

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

        <div className={styles.sectionHeading}>Topics</div>
        {sidebarTopics.map(({ label, tag }) => (
          <NavLink
            key={tag}
            to={`/tag/${tag}`}
            className={({ isActive }) => (isActive ? styles.activeSubLink : styles.subLink)}
          >
            {label}
          </NavLink>
        ))}
      
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
        {top5Posts.map((post) => (
        <NavLink
          key={post.id}
          to={`/post/${post.id}`}
          className={({ isActive }) => (isActive ? styles.activeSubLink : styles.subLink)}
        >
          {post.title.length > 30 ? post.title.slice(0, 30) + '…' : post.title}
        </NavLink>
      ))}
      </nav>
    </Box>
  );
};

export default Sidebar;
