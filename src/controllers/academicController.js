const db = require("../../db");

// Add Academic Record
function addAcademicRecord(req, res) {
  const {
    student_id,
    subject,
    marks,
    grade,
    academic_year
  } = req.body;

  if (!student_id || !subject || marks === undefined) {
    return res.status(400).json({
      success: false,
      message: "Student ID, subject and marks are required"
    });
  }

  db.query(
    `INSERT INTO academic_records
     (student_id, subject, marks, grade, academic_year)
     VALUES (?, ?, ?, ?, ?)`,
    [
      student_id,
      subject,
      marks,
      grade || null,
      academic_year || null
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to add academic record"
        });
      }

      return res.status(201).json({
        success: true,
        message: "Academic record added successfully",
        id: result.insertId
      });
    }
  );
}

// Get Student Academic Records
function getStudentAcademic(req, res) {
  const { studentId } = req.params;

  db.query(
    `SELECT
      id,
      student_id,
      subject,
      marks,
      grade,
      academic_year
     FROM academic_records
     WHERE student_id = ?
     ORDER BY subject`,
    [studentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch academic records"
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        records: results
      });
    }
  );
}

module.exports = {
  addAcademicRecord,
  getStudentAcademic
};