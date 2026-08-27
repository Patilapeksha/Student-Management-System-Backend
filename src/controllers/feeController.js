const db = require("../../db");

// Add Fee
function addFee(req, res) {
  const {
    student_id,
    fee_type,
    amount,
    paid_amount,
    due_date
  } = req.body;

  if (!student_id || !fee_type || amount === undefined) {
    return res.status(400).json({
      success: false,
      message: "Student ID, fee type and amount are required"
    });
  }

  const paid = paid_amount || 0;

  let status = "PENDING";

  if (paid >= amount) {
    status = "PAID";
  } else if (paid > 0) {
    status = "PARTIAL";
  }

  db.query(
    `INSERT INTO fees
     (student_id, fee_type, amount, paid_amount, due_date, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      student_id,
      fee_type,
      amount,
      paid,
      due_date || null,
      status
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to add fee"
        });
      }

      return res.status(201).json({
        success: true,
        message: "Fee added successfully",
        id: result.insertId
      });
    }
  );
}

// Get All Fees
function getAllFees(req, res) {
  db.query(
    `SELECT
      id,
      student_id,
      fee_type,
      amount,
      paid_amount,
      due_date,
      status
     FROM fees
     ORDER BY due_date`,
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch fees"
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        fees: results
      });
    }
  );
}

// Get Student Fees
function getStudentFees(req, res) {
  const { studentId } = req.params;

  db.query(
    `SELECT
      id,
      student_id,
      fee_type,
      amount,
      paid_amount,
      due_date,
      status
     FROM fees
     WHERE student_id = ?
     ORDER BY due_date`,
    [studentId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch fees"
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        fees: results
      });
    }
  );
}

module.exports = {
  addFee,
  getAllFees,
  getStudentFees
};