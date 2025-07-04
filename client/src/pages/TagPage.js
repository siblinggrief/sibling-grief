import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress, Snackbar, Alert, useTheme } from "@mui/material";
import Post from "../components/Post";
import { usePosts } from '../context/PostsContext';

const TagPage = () => {
  const theme = useTheme();
  
  const { tagName } = useParams();
  const { posts, deletePost, fetchPosts, loading } = usePosts();
  
  const [filteredPosts, setFilteredPosts] = useState([]);

    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success', // success | error | warning | info
    });
  
    const showSnackbar = (message, severity = 'success') => {
      setSnackbar({ open: true, message, severity });
    };
  
    const handleCloseSnackbar = () => {
      setSnackbar({ ...snackbar, open: false });
    };

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
          <CircularProgress sx={{ color: theme.palette.custom.darkGreen }}/>
        </Box>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} showSnackbar={showSnackbar}/>
        ))
      ) : (
        <Typography variant="body2" textAlign="center" mt={4}>
          No posts found for this topic: {tagName}. Be the first to share!
        </Typography>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={30000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: '80px' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TagPage;
