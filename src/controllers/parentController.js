const db = require("../../db");

// Get Child Profile
function getChildProfile(req, res) {
  const parentId = req.user.id;

  db.query(
    `SELECT id, name, roll_no, class_name, section,
            guardian_name, guardian_contact, contact,
            admission_date, photo, is_active
     FROM students
     WHERE parent_user_id = ?`,
    [parentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Child profile not found"
        });
      }

      res.status(200).json({
        success: true,
        child: results[0]
      });
    }
  );
}

// Get Child Attendance
function getChildAttendance(req, res) {
  const parentId = req.user.id;

  db.query(
    `SELECT a.id, a.attendance_date, a.status, a.remarks
     FROM attendance a
     INNER JOIN students s ON a.student_id = s.id
     WHERE s.parent_user_id = ?
     ORDER BY a.attendance_date DESC`,
    [parentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(200).json({
        success: true,
        count: results.length,
        attendance: results
      });
    }
  );
}

// Get Child Academic Records
function getChildAcademic(req, res) {
  const parentId = req.user.id;

  db.query(
    `SELECT a.id, a.subject, a.marks, a.grade, a.academic_year
     FROM academic_records a
     INNER JOIN students s ON a.student_id = s.id
     WHERE s.parent_user_id = ?
     ORDER BY a.subject`,
    [parentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(200).json({
        success: true,
        count: results.length,
        records: results
      });
    }
  );
}

// Get Child Fees
function getChildFees(req, res) {
  const parentId = req.user.id;

  db.query(
    `SELECT f.id, f.fee_type, f.amount, f.paid_amount,
            f.due_date, f.status
     FROM fees f
     INNER JOIN students s ON f.student_id = s.id
     WHERE s.parent_user_id = ?
     ORDER BY f.due_date`,
    [parentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(200).json({
        success: true,
        count: results.length,
        fees: results
      });
    }
  );
}

module.exports = {
  getChildProfile,
  getChildAttendance,
  getChildAcademic,
  getChildFees
};