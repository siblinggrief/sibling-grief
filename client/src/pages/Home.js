import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import AddNewPost from "../components/AddNewPost";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config";

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <>
      <Box textAlign="center" my={4}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Sibling Grief Support website
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Share, connect, and heal through voice and text with others who understand sibling loss.
        </Typography>
      </Box>

      {user ? (
        <>
          {/* Add New Post */}
          <Box textAlign="center" mb={2}>
            <AddNewPost onPostAdded={fetchPosts} />
          </Box>

          {/* Posts List */}
          {loading ? (
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
        <>
          <Typography variant="h6" textAlign="center" color="textSecondary" mt={4}>
            Please log in to view and post content.
          </Typography>
        </>
      )}
    </>
  );
};

export default Home;
