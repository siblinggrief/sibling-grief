const express = require("express");
const router = express.Router();
const { testUpload, listUploads } = require("../controllers/cloudinaryController");

router.post("/test-upload", testUpload);
router.get("/list-uploads", listUploads);

module.exports = router;