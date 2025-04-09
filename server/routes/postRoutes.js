const express = require("express");
const router = express.Router();
const { getPosts, createPost, deletePost } = require("../controllers/postController");

// Routes
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);

// Test Cloudinary Upload
// const cloudinary = require("../config/cloudinary");
// router.post("/test-upload", async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(
//       "https://res.cloudinary.com/demo/image/upload/sample.jpg",
//       { public_id: "test_sample_image" }
//     );
//     res.json(result);
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Cloudinary upload failed" });
//   }
// });

module.exports = router;
