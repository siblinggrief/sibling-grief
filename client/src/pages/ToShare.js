import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Post from '../components/Post';
import AddNewPost from '../components/AddNewPost';
import { Typography, Box, CircularProgress } from '@mui/material';
import { usePosts } from '../context/PostsContext';
import SortDropdown from '../components/SortDropdown';

const ToShare = () => {
  const { posts, fetchPosts, deletePost, loading, setHasFetched } = usePosts();

  const [searchParams] = useSearchParams();
  const targetPostId = searchParams.get("highlight");
  const postRefs = useRef({});
  
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

        <AddNewPost onPostAdded={handleRefetchPosts} />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div
            key={post.id}
            ref={(el) => (postRefs.current[post.id] = el)}
          >
            <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />
          </div>
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
