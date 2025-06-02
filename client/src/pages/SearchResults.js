// pages/SearchResults.js
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import Post from "../components/Post";
import { usePosts } from "../context/PostsContext";

const SearchResults = () => {
  const { posts } = usePosts();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query")?.toLowerCase() || "";

  const filteredPosts = useMemo(() => {
    const approvedPosts = posts.filter((post) => post.status === "approved");
    return approvedPosts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const description = post.description?.toLowerCase() || "";
      return title.includes(query) || description.includes(query);
    });
  }, [posts, query]);

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Search results for "<strong>{query}</strong>"
      </Typography>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <Typography variant="body2">No results found.</Typography>
      )}
    </Box>
  );
};

export default SearchResults;
