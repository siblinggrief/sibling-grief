import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";
import Post from "../components/Post";
import { usePosts } from '../context/PostsContext';

const TagPage = () => {
  const { tagName } = useParams();
  const { posts, deletePost, fetchPosts, loading } = usePosts();
  
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (!posts.length && !loading) {
      fetchPosts();
    }
  }, [posts, loading, fetchPosts]);

  useEffect(() => {
    const filtered = posts.filter(post => (post.status === 'approved' && post.topics?.includes(tagName)));
    setFilteredPosts(filtered);
  }, [posts, tagName]);

  const handlePostDeleted = (postId) => {
    deletePost(postId);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Posts tagged with: {tagName}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />
        ))
      ) : (
        <Typography variant="body2" textAlign="center" mt={4}>
          No posts found for this topic: {tagName}. Be the first to share!
        </Typography>
      )}
    </Box>
  );
};

export default TagPage;
