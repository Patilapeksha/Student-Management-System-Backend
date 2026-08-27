const db = require("../../db");

// Get My Profile
function getMyProfile(req, res) {
  const userId = req.user.id;

  db.query(
    `SELECT
      id,
      user_id,
      name,
      roll_no,
      class_name,
      section,
      guardian_name,
      guardian_contact,
      contact,
      admission_date,
      photo,
      is_active
     FROM students
     WHERE user_id = ?`,
    [userId],
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
          message: "Student profile not found"
        });
      }

      return res.status(200).json({
        success: true,
        student: results[0]
      });
    }
  );
}

// Update My Profile
function updateMyProfile(req, res) {
  const userId = req.user.id;

  const {
    name,
    guardian_name,
    guardian_contact,
    contact
  } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required"
    });
  }

  db.query(
    `UPDATE students
     SET
       name = ?,
       guardian_name = ?,
       guardian_contact = ?,
       contact = ?
     WHERE user_id = ?`,
    [
      name,
      guardian_name || null,
      guardian_contact || null,
      contact || null,
      userId
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to update profile"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Student profile not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully"
      });
    }
  );
}

module.exports = {
  getMyProfile,
  updateMyProfile
};