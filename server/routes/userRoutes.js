const express = require("express");
const { getUserRole } = require("../controllers/userController");
const router = express.Router();

router.get("/user-role", getUserRole);

module.exports = router;