const express = require("express");

const {
  getMyProfile,
  updateMyProfile
} = require("../controllers/studentProfileController");

const {
  authenticateToken,
  authorizeRoles
} = require("../../middleware/authMiddleware");

const router = express.Router();

// Get own profile
router.get(
  "/me",
  authenticateToken,
  authorizeRoles("STUDENT"),
  getMyProfile
);

// Update own profile
router.put(
  "/me",
  authenticateToken,
  authorizeRoles("STUDENT"),
  updateMyProfile
);

module.exports = router;