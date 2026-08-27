const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  fee_type VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paid_amount DECIMAL(10,2) DEFAULT 0,
  due_date DATE,
  status ENUM('PENDING', 'PARTIAL', 'PAID') DEFAULT 'PENDING',
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

  console.log("Fees table created successfully");
  db.end();
});