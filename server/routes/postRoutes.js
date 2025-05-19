const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  deletePost,
  updateEmojiCount,
  updatePostStatus
} = require("../controllers/postController");

// Post Routes
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.post('/posts/:postId/updateStatus', updatePostStatus);
router.delete("/posts/:id", deletePost);

// New route to update emoji count
router.post("/posts/:id/updateEmoji", updateEmojiCount); // Add this route

module.exports = router;
