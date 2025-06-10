const express = require("express");
const { getUserRole, requestAdminAccess, getAdminRequests, updateAdminRequestsStatus } = require("../controllers/userController");
const router = express.Router();

router.get("/user-role", getUserRole);
router.get("/request-admin", getAdminRequests);
router.post("/request-admin", requestAdminAccess);
router.post('/:reqId/update-admin-status', updateAdminRequestsStatus);

module.exports = router;