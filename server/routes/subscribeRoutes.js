// routes/subscribeRoutes.js
const express = require("express");
const router = express.Router();
const {
  subscribeUser,
  unsubscribeUser,
  getSubscribers
} = require("../controllers/subscribeController");

router.post("/subscribe", subscribeUser);
router.post("/unsubscribe", unsubscribeUser);
router.get("/subscribers", getSubscribers);

module.exports = router;
