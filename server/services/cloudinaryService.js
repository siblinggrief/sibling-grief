const cloudinary = require("../config/cloudinary");

const uploadAudio = async (filePath, publicId) => {
  return cloudinary.uploader.upload(filePath, {
    resource_type: "video", // or 'auto' for dynamic
    public_id: publicId,
  });
};

const deleteFile = async (publicId) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "video",
  });
};

module.exports = { uploadAudio, deleteFile };