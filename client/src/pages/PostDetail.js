import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Post from "../components/Post";

const PostDetail = () => {
  const { postId } = useParams();
  const { posts, fetchPosts } = usePosts();
  const [loading, setLoading] = useState(false);

  const post = posts.find((p) => p.id === postId);

  useEffect(() => {
    if (!post) {
      setLoading(true);
      fetchPosts().finally(() => setLoading(false));
    }
  }, [post, fetchPosts]);

  if (loading) {
    return (
      <Box mt={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Typography variant="body1" textAlign="center" mt={4}>
        Post not found.
      </Typography>
    );
  }

  return (
    <Box mt={2}>
      <Post post={post} />
    </Box>
  );
};

export default PostDetail;
