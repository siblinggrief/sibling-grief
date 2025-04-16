const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  deletePost,
  updateEmojiCount, // New route for updating emoji count
} = require("../controllers/postController");

// Post Routes
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);

// New route to update emoji count
router.post("/posts/:id/updateEmoji", updateEmojiCount); // Add this route

module.exports = router;
