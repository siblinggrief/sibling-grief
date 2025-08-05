// server/routes/settingsRoutes.js
const express = require('express');
const { updateFont, getFont } = require('../controllers/settingsController');
const router = express.Router();

router.get('/font', getFont);         // Public — anyone can fetch current font
router.put('/font', updateFont);      // Admin-only — update font

module.exports = router;