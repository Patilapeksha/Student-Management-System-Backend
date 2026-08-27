const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const studentProfileRoutes = require("./src/routes/studentProfileRoutes");
const parentRoutes = require("./src/routes/parentRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const academicRoutes = require("./src/routes/academicRoutes");
const feeRoutes = require("./src/routes/feeRoutes");
const { addTeacher } = require("./src/controllers/teacherController");

const teacherRoutes = require("./src/routes/teacherRoutes");


const {
  authenticateToken,
  authorizeRoles
} = require("./middleware/authMiddleware");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Student routes
app.use("/api/students", studentRoutes);
app.use("/api/student-profile", studentProfileRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/teachers", teacherRoutes);


// Protected Admin test route
app.get(
  "/api/admin/test",
  authenticateToken,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Admin protected route working",
      user: req.user
    });
  }
);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Student Management System API is running"
  });
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});