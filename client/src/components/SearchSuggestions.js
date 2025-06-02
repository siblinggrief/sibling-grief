// components/SearchSuggestions.js
import React, { useState, useRef, useEffect } from "react";
import { InputBase, Paper, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { usePosts } from "../context/PostsContext";
import styles from "./SearchSuggestions.module.css";

const SearchSuggestions = ({ onSelect }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const containerRef = useRef(null);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFilteredPosts = () => {
    if (!query) return [];

    const q = query.toLowerCase();
    const titleMatches = [];
    const descriptionMatches = [];

    const approvedPosts = posts.filter((post) => post.status === "approved");
    approvedPosts.forEach((post) => {
      const title = post.title?.toLowerCase() || "";
      const description = post.description?.toLowerCase() || "";

      if (title.includes(q)) {
        titleMatches.push(post);
      } else if (description.includes(q)) {
        descriptionMatches.push(post);
      }
    });

    return [...titleMatches, ...descriptionMatches].slice(0, 5); 
  };

  const suggestions = getFilteredPosts();

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.searchWrapper}>
        <InputBase
          fullWidth
          placeholder="Search…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          inputProps={{
            "aria-label": "search",
            style: { color: theme.palette.text.secondary },
          }}
          
        />
        <IconButton
            type="submit"
            size="small"
            aria-label="search"
            onClick={() => {
                if (query.trim()) {
                navigate(`/search?query=${encodeURIComponent(query.trim())}`);
                setShowSuggestions(false);
                }
            }}
            >
            <SearchIcon sx={{ color: theme.palette.custom.darkGreen }}/>
            </IconButton>
      </div>

      {query && showSuggestions && suggestions.length > 0 && (
        <Paper elevation={2} className={styles.suggestions}>
          <List>
            {suggestions.map((post) => (
              <ListItem
                key={post.id}
                button
                onClick={() => {
                  onSelect(post);
                  setShowSuggestions(false);
                }}
              >
                <ListItemText
                  primary={
                    <span
                      style={{
                        color:
                        theme.palette.mode === "dark"
                            ? theme.palette.custom.white
                            : theme.palette.custom.black,
                      }}
                    >
                    {post.title}
                    </span>
                }
                  secondary={
                    <span
                      style={{
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.custom.lightGreen
                            : theme.palette.custom.darkGreen,
                      }}
                    >
                      {post.description?.slice(0, 80)}
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchSuggestions;
