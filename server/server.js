require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// 🔹 Import config and routes
require("./config/firebase"); // initializes Firebase
require("./config/cloudinary"); // configures Cloudinary
const postRoutes = require("./routes/postRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

// 🔹 Root route
app.get("/", (req, res) => {
  res.json({
    status: "✅ Backend is running",
    routes: {
      getPosts: "GET /api/posts",
      createPost: "POST /api/posts",
      deletePost: "DELETE /api/posts/:id",
      testCloudinary: "POST /api/test-upload",
    },
  });
});

// 🔹 Use routes
app.use("/api", postRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running and listening on port ${PORT}`);
});
