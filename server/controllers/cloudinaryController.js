// controllers/cloudinaryController.js
const cloudinary = require("../config/cloudinary");

const testUpload = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      {
        public_id: "test_audio_upload",
        resource_type: "video", // required for audio files
      }
    );
    res.json(result);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
};

module.exports = { testUpload };
