const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/postController");

const { testUpload } = require("../controllers/cloudinaryController");

// Post Routes
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);

// Cloudinary Test Route
router.post("/test-upload", testUpload);

module.exports = router;
