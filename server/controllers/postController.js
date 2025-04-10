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
        .split("/upload/")[1] // test-audios/test_audio_upload.mp3
        .replace(/^v\d+\//, ""); // remove version folder if present

      const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove .mp3

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

module.exports = {
  getPosts,
  createPost,
  deletePost,
};
