import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Post from '../components/Post';
import AddNewPost from '../components/AddNewPost';
import { Typography, Box, CircularProgress, Snackbar, Alert, useTheme } from '@mui/material';
import { usePosts } from '../context/PostsContext';
import SortDropdown from '../components/SortDropdown';

const ToShare = () => {
  const theme = useTheme();
    
  const { posts, fetchPosts, deletePost, loading, setHasFetched } = usePosts();

  const [searchParams] = useSearchParams();
  const targetPostId = searchParams.get("highlight");
  const postRefs = useRef({});
  
  const [sortOption, setSortOption] = useState('newest');

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

  // Memoize the sorted posts to optimize performance and avoid unnecessary re-renders
  const sortedPosts = useMemo(() => {
    const approvedPosts = posts.filter((post) => post.status === 'approved');
    const sortedArray = [...approvedPosts];
    if (sortOption === 'newest') {
      return sortedArray.sort((a, b) => b.createdAt._seconds - a.createdAt._seconds);
    }
    if (sortOption === 'oldest') {
      return sortedArray.sort((a, b) => a.createdAt._seconds - b.createdAt._seconds);
    }
    if (sortOption === 'mostReactions') {
      return sortedArray.sort((a, b) => {
        const aReactions = Object.values(a.counts || {}).reduce((sum, val) => sum + val, 0);
        const bReactions = Object.values(b.counts || {}).reduce((sum, val) => sum + val, 0);
        return bReactions - aReactions;
      });
    }
    // If more sort options are added in the future, handle them here
    return sortedArray;
  }, [posts, sortOption]);

  useEffect(() => {
    if (!loading && targetPostId && postRefs.current[targetPostId]) {
      postRefs.current[targetPostId].scrollIntoView({ behavior: "smooth", block: "start" });
      postRefs.current[targetPostId].classList.add("highlighted-post");
      setTimeout(() => {
        postRefs.current[targetPostId].classList.remove("highlighted-post");
      }, 3000); // remove highlight after 3 seconds
    }
  }, [loading, targetPostId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostDeleted = (postId) => {
    deletePost(postId);
  };

  const handleRefetchPosts = () => {
    setHasFetched(false); // Reset the fetched state to allow refetching
    fetchPosts();
  };

  return (
    <>
      {/* Row for Sort Dropdown, Theme Toggle, and Add New Post Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />

        <AddNewPost onPostAdded={handleRefetchPosts} onPostAddedSuccess={() => showSnackbar("Post added successfully!")}/>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: theme.palette.custom.darkGreen }}/>
        </Box>
      ) : sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div
            key={post.id}
            ref={(el) => (postRefs.current[post.id] = el)}
          >
            <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} showSnackbar={showSnackbar}/>
          </div>
        ))
      ) : (
        <Typography variant="body2" textAlign="center" mt={4}>
          No posts yet. Be the first to share!
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
    </>
  );
};

export default ToShare;
