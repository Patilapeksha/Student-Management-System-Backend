const db = require("../../db");

// Mark Attendance
function markAttendance(req, res) {
  const { student_id, attendance_date, status, remarks } = req.body;

  if (!student_id || !attendance_date || !status) {
    return res.status(400).json({
      success: false,
      message: "Student ID, date and status are required"
    });
  }

  if (!["PRESENT", "ABSENT"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be PRESENT or ABSENT"
    });
  }

  db.query(
    `INSERT INTO attendance
     (student_id, attendance_date, status, remarks)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       status = VALUES(status),
       remarks = VALUES(remarks)`,
    [student_id, attendance_date, status, remarks || null],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to mark attendance"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Attendance marked successfully"
      });
    }
  );
}

// Get All Attendance
function getAllAttendance(req, res) {
  db.query(
    `SELECT
      id,
      student_id,
      attendance_date,
      status,
      remarks
     FROM attendance
     ORDER BY attendance_date DESC`,
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch attendance"
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        attendance: results
      });
    }
  );
}

// Get Student Attendance
function getStudentAttendance(req, res) {
  const { studentId } = req.params;

  db.query(
    `SELECT
      id,
      student_id,
      attendance_date,
      status,
      remarks
     FROM attendance
     WHERE student_id = ?
     ORDER BY attendance_date DESC`,
    [studentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch attendance"
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        attendance: results
      });
    }
  );
}

module.exports = {
  markAttendance,
  getAllAttendance,
  getStudentAttendance
};