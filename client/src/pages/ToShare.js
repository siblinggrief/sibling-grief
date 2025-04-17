// pages/ToShare.js
import React, { useEffect } from 'react';
import Post from '../components/Post';
import AddNewPost from '../components/AddNewPost';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';

const ToShare = () => {
  const { user } = useAuth();
  const { posts, fetchPosts, deletePost, loadingPosts, setHasFetched } = usePosts();

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user, fetchPosts]);

  const handlePostDeleted = (postId) => {
    deletePost(postId);
  };

  const handleRefetchPosts = () => {
    setHasFetched(false); // Reset the fetched state to allow refetching
    fetchPosts();
  }

  return (
    <>
      {user ? (
        <>
          <Box textAlign="center" mb={2}>
            <AddNewPost onPostAdded={handleRefetchPosts} />
          </Box>

          {loadingPosts ? (
            <Box display="flex" justifyContent="center" mt={3}>
              <CircularProgress />
            </Box>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />
            ))
          ) : (
            <Typography variant="body2" textAlign="center" mt={4}>
              No posts yet. Be the first to share!
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h6" textAlign="center" color="textSecondary" mt={4}>
          Please log in to view and post content.
        </Typography>
      )}
    </>
  );
};

export default ToShare;
