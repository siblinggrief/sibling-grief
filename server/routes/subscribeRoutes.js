// routes/subscribeRoutes.js
const express = require("express");
const router = express.Router();
const {
  subscribeUser,
  unsubscribeUser,
  getSubscribers,
  sendNewsLetterEmail,
  sendWeeklyNewsletter,
} = require("../controllers/subscribeController");

router.post("/subscribe", subscribeUser);
router.post("/unsubscribe", unsubscribeUser);
router.get("/subscribers", getSubscribers);

router.post('/test-newsletter', sendNewsLetterEmail);
router.post('/weekly-newsletter', sendWeeklyNewsletter);

module.exports = router;
