require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Ignore SSL verification errors

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const cloudinary = require("cloudinary").v2;

const app = express();
const PORT = process.env.PORT || 8080;

//🔹 Initialize Firebase
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
  console.log("✅ Firebase initialized");
} catch (err) {
  console.error("❌ Firebase init failed", err);
}
 
//🔹 Database
const db = admin.firestore();

app.use(cors());
app.use(express.json());

//🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// 🔹 Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// 🔹 API to get all posts
app.get("/api/posts", async (req, res) => {
  try {
    const postsSnapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// 🔹 API to create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, audioUrl } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newPost = {
      title,
      upVotesCount: 0,
      downVotesCount: 0,
      audioUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("posts").add(newPost);
    console.log("Post added successfully to Firestore.");
    res.json({ id: docRef.id, ...newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// 🔹 API to delete a post (including Cloudinary file)
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postRef = db.collection("posts").doc(id);
    const postSnapshot = await postRef.get();

    if (!postSnapshot.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = postSnapshot.data();

    // If post has an audio file, delete it from Cloudinary
    if (postData.audioUrl) {
      const cloudinaryUrl = postData.audioUrl;
      const publicId = cloudinaryUrl.split("/").pop().split(".")[0]; // Extract public ID

      console.log(`Deleting Cloudinary file: ${publicId}`);

      await cloudinary.uploader.destroy(publicId, { resource_type: "video" })
    }

    // Delete post from Firestore
    await postRef.delete();
    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// 🔹 Test API to upload in Cloudinary
app.post("/api/test-upload", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      { public_id: "test_sample_image" }
    );
    res.json(result);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running and listening on port ${PORT}`);
});
