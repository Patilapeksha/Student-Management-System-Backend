const express = require("express");

const {
  addAcademicRecord,
  getStudentAcademic
} = require("../controllers/academicController");

const {
  authenticateToken,
  authorizeRoles
} = require("../../middleware/authMiddleware");

const router = express.Router();

// Admin adds academic record
router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  addAcademicRecord
);

// Admin gets student academic records
router.get(
  "/student/:studentId",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getStudentAcademic
);

module.exports = router;