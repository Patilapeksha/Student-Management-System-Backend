const db = require("../../db");

// Add Teacher
const addTeacher = (req, res) => {
  const { name, email, phone, subject } = req.body;

  const sql = `
    INSERT INTO teachers (name, email, phone, subject)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, subject], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to add teacher"
      });
    }

    res.status(201).json({
      message: "Teacher added successfully",
      teacherId: result.insertId
    });
  });
};

// Get Teachers
const getTeachers = (req, res) => {
  const sql = "SELECT * FROM teachers";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to get teachers"
      });
    }

    res.json(results);
  });
};

// Update Teacher
const updateTeacher = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, subject } = req.body;

  const sql = `
    UPDATE teachers
    SET name = ?, email = ?, phone = ?, subject = ?
    WHERE id = ?
  `;

  db.query(sql, [name, email, phone, subject, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to update teacher"
      });
    }

    res.json({
      message: "Teacher updated successfully"
    });
  });
};

// Deactivate Teacher
const deactivateTeacher = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE teachers SET status = 'Inactive' WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to deactivate teacher"
      });
    }

    res.json({
      message: "Teacher deactivated successfully"
    });
  });
};

module.exports = {
  addTeacher,
  getTeachers,
  updateTeacher,
  deactivateTeacher
};