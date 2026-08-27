const express = require("express");

const {
  addFee,
  getAllFees,
  getStudentFees
} = require("../controllers/feeController");

const {
  authenticateToken,
  authorizeRoles
} = require("../../middleware/authMiddleware");

const router = express.Router();

// Admin adds fee
router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  addFee
);

// Admin gets all fees
router.get(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getAllFees
);

// Admin gets student fees
router.get(
  "/student/:studentId",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getStudentFees
);

module.exports = router;