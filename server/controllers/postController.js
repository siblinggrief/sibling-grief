const { db, admin } = require("../config/firebase");
const { deleteFile } = require("../services/cloudinaryService");

const getPosts = async (req, res) => {
  try {
    const postsSnapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, audioUrl, audioDuration, topics } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newPost = {
      title,
      description,
      audioUrl,
      audioDuration,
      topics: Array.isArray(topics) ? topics : [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("posts").add(newPost);
    res.json({ id: docRef.id, ...newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postRef = db.collection("posts").doc(id);
    const postSnapshot = await postRef.get();

    if (!postSnapshot.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = postSnapshot.data();

    if (postData.audioUrl) {
      const cloudinaryUrl = postData.audioUrl;
    
      // Remove domain and version info to isolate public_id
      const publicIdWithExtension = cloudinaryUrl
        .split("/upload/")[1] // Sibling%20Grief%20Audio%20Posts/xemsme4zbfcfjbdofu7l.webm
        .replace(/^v\d+\//, ""); // Remove version folder if present
    
      // Decode the URL to get proper folder path with space
      const decodedPublicId = decodeURIComponent(publicIdWithExtension);
    
      // Remove extension (.webm, .mp3, etc.)
      const publicId = decodedPublicId.replace(/\.[^/.]+$/, "");
    
      console.log(`Deleting Cloudinary file: ${publicId}`);
      await deleteFile(publicId);
    }

    await postRef.delete();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

const updateEmojiCount = async (req, res) => {
  try {
    const { id } = req.params;
    const { emoji } = req.body;

    if (!emoji) {
      return res.status(400).json({ error: "Emoji is required" });
    }

    const postRef = db.collection("posts").doc(id);
    const postSnapshot = await postRef.get();

    if (!postSnapshot.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = postSnapshot.data();
    const currentCounts = postData.counts || {};

    // Increment the emoji count
    const updatedCounts = {
      ...currentCounts,
      [emoji]: (currentCounts[emoji] || 0) + 1,
    };

    // Update Firestore document with new emoji counts
    await postRef.update({
      counts: updatedCounts,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Return updated post data
    res.json({ id, updatedCounts });
  } catch (error) {
    console.error("Error updating emoji count:", error);
    res.status(500).json({ error: "Failed to update emoji count" });
  }
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
  updateEmojiCount,
};
