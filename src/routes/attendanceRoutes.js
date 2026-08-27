const express = require("express");

const {
  markAttendance,
  getAllAttendance,
  getStudentAttendance
} = require("../controllers/attendanceController");

const {
  authenticateToken,
  authorizeRoles
} = require("../../middleware/authMiddleware");

const router = express.Router();

// Admin marks attendance
router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  markAttendance
);

// Admin gets all attendance
router.get(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getAllAttendance
);

// Admin gets student attendance
router.get(
  "/student/:studentId",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getStudentAttendance
);

module.exports = router;