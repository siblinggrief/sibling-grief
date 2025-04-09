const cloudinary = require("../config/cloudinary");

const testUpload = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      {
        public_id: "test_audio_upload",
        resource_type: "video", // required for audio files
        folder: "test-audios", 
      }
    );
    res.json(result);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
};

const listUploads = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({ resource_type: "video" });
    const publicIds = result.resources.map((res) => res.public_id);
    res.json(publicIds);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
};

module.exports = { testUpload, listUploads };
