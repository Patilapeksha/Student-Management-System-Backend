const express = require("express");

const {
  getChildProfile,
  getChildAttendance,
  getChildAcademic,
  getChildFees
} = require("../controllers/parentController");

const {
  authenticateToken,
  authorizeRoles
} = require("../../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/child",
  authenticateToken,
  authorizeRoles("PARENT"),
  getChildProfile
);

router.get(
  "/child/attendance",
  authenticateToken,
  authorizeRoles("PARENT"),
  getChildAttendance
);

router.get(
  "/child/academic",
  authenticateToken,
  authorizeRoles("PARENT"),
  getChildAcademic
);

router.get(
  "/child/fees",
  authenticateToken,
  authorizeRoles("PARENT"),
  getChildFees
);

module.exports = router;