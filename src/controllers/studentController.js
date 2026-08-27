const db = require("../../db");

// Create Student
async function createStudent(req, res) {
  try {
    const {
      name,
      roll_no,
      class_name,
      section,
      guardian_name,
      guardian_contact,
      contact,
      admission_date,
      photo
    } = req.body;

    if (!name || !roll_no || !class_name || !section) {
      return res.status(400).json({
        success: false,
        message: "Name, roll number, class and section are required"
      });
    }

    db.query(
      "SELECT id FROM students WHERE roll_no = ?",
      [roll_no],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database error"
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            success: false,
            message: "Roll number already exists"
          });
        }

        const sql = `
          INSERT INTO students
          (
            name,
            roll_no,
            class_name,
            section,
            guardian_name,
            guardian_contact,
            contact,
            admission_date,
            photo
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          name,
          roll_no,
          class_name,
          section,
          guardian_name || null,
          guardian_contact || null,
          contact || null,
          admission_date || null,
          photo || null
        ];

        db.query(sql, values, (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to create student"
            });
          }

          return res.status(201).json({
            success: true,
            message: "Student created successfully",
            studentId: result.insertId
          });
        });
      }
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Get All Students
// Get All Students
async function getAllStudents(req, res) {
  db.query(
    `SELECT
      students.id,
      students.user_id,
      students.name,
      users.email,
      students.roll_no,
      students.class_name,
      students.section,
      students.guardian_name,
      students.guardian_contact,
      students.contact,
      students.admission_date,
      students.photo,
      students.is_active,
      students.created_at,
      students.updated_at
     FROM students
     LEFT JOIN users
       ON students.user_id = users.id
     ORDER BY students.id DESC`,
    (err, results) => {
      if (err) {
        console.error("Get students error:", err);

        return res.status(500).json({
          success: false,
          message: "Failed to fetch students"
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        students: results
      });
    }
  );
}

// Get One Student
async function getStudentById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Valid student ID is required"
    });
  }

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
      is_active,
      created_at,
      updated_at
     FROM students
     WHERE id = ?`,
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch student"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Student not found"
        });
      }

      return res.status(200).json({
        success: true,
        student: results[0]
      });
    }
  );
}

// Update Student
async function updateStudent(req, res) {
  const { id } = req.params;

  const {
    name,
    roll_no,
    class_name,
    section,
    guardian_name,
    guardian_contact,
    contact,
    admission_date,
    photo
  } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Valid student ID is required"
    });
  }

  if (!name || !roll_no || !class_name || !section) {
    return res.status(400).json({
      success: false,
      message: "Name, roll number, class and section are required"
    });
  }

  db.query(
    "SELECT id FROM students WHERE id = ?",
    [id],
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
          message: "Student not found"
        });
      }

      db.query(
        "SELECT id FROM students WHERE roll_no = ? AND id != ?",
        [roll_no, id],
        (err, duplicateResults) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Database error"
            });
          }

          if (duplicateResults.length > 0) {
            return res.status(409).json({
              success: false,
              message: "Roll number already exists"
            });
          }

          const sql = `
            UPDATE students
            SET
              name = ?,
              roll_no = ?,
              class_name = ?,
              section = ?,
              guardian_name = ?,
              guardian_contact = ?,
              contact = ?,
              admission_date = ?,
              photo = ?
            WHERE id = ?
          `;

          const values = [
            name,
            roll_no,
            class_name,
            section,
            guardian_name || null,
            guardian_contact || null,
            contact || null,
            admission_date || null,
            photo || null,
            id
          ];

          db.query(sql, values, (err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Failed to update student"
              });
            }

            return res.status(200).json({
              success: true,
              message: "Student updated successfully"
            });
          });
        }
      );
    }
  );
}

// Deactivate Student
async function deactivateStudent(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Valid student ID is required"
    });
  }

  db.query(
    "SELECT id, is_active FROM students WHERE id = ?",
    [id],
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
          message: "Student not found"
        });
      }

      if (!results[0].is_active) {
        return res.status(400).json({
          success: false,
          message: "Student is already inactive"
        });
      }

      db.query(
        "UPDATE students SET is_active = FALSE WHERE id = ?",
        [id],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to deactivate student"
            });
          }

          return res.status(200).json({
            success: true,
            message: "Student deactivated successfully"
          });
        }
      );
    }
  );
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deactivateStudent
};