const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  status ENUM('PRESENT', 'ABSENT') NOT NULL,
  remarks VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (student_id)
  REFERENCES students(id)
  ON DELETE CASCADE,

  UNIQUE KEY unique_student_date (student_id, attendance_date)
)
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Database error:", err);
    return;
  }

  console.log("Attendance table created successfully");
  db.end();
});