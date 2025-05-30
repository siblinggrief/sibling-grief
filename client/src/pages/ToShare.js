import React, { useEffect, useState, useMemo } from 'react';
import Post from '../components/Post';
import AddNewPost from '../components/AddNewPost';
import { Typography, Box, CircularProgress } from '@mui/material';
import { usePosts } from '../context/PostsContext';
import SortDropdown from '../components/SortDropdown';

const ToShare = () => {
  const { posts, fetchPosts, deletePost, loading, setHasFetched } = usePosts();
  
  const [sortOption, setSortOption] = useState('newest');

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
    // If more sort options are added in the future, handle them here
    return sortedArray;
  }, [posts, sortOption]);

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

        <AddNewPost onPostAdded={handleRefetchPosts} />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />
        ))
      ) : (
        <Typography variant="body2" textAlign="center" mt={4}>
          No posts yet. Be the first to share!
        </Typography>
      )}
    </>
  );
};

export default ToShare;
