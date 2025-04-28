// src/pages/TagPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import Post from "../components/Post"; // Reuse your Post component!
import { usePosts } from '../context/PostsContext';

const TagPage = () => {
  const { tagName } = useParams();
  const { posts } = usePosts();

  const filteredPosts = posts.filter(post => post.topics?.includes(tagName));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Posts tagged with: {tagName}
      </Typography>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <Typography variant="body2" mt={3}>
          No posts found for {tagName}.
        </Typography>
      )}
    </Box>
  );
};

export default TagPage;
