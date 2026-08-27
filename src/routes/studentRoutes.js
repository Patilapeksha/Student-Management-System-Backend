const express = require("express");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deactivateStudent
} = require("../controllers/studentController");

const {
  authenticateToken,
  authorizeRoles
} = require("../../middleware/authMiddleware");

const router = express.Router();

// Get all students - Admin only
router.get(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getAllStudents
);

// Get one student - Admin only
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getStudentById
);

// Create student - Admin only
router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  createStudent
);

// Update student - Admin only
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  updateStudent
);

// Deactivate student - Admin only
router.patch(
  "/:id/deactivate",
  authenticateToken,
  authorizeRoles("ADMIN"),
  deactivateStudent
);

module.exports = router;