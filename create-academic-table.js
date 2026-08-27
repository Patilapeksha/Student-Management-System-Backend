const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS academic_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject VARCHAR(100) NOT NULL,
  marks DECIMAL(5,2) NOT NULL,
  grade VARCHAR(5),
  academic_year VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (student_id)
  REFERENCES students(id)
  ON DELETE CASCADE
)
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Database error:", err);
    return;
  }

  console.log("Academic records table created successfully");
  db.end();
});