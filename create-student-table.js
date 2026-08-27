require("dotenv").config();

const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  name VARCHAR(100) NOT NULL,
  roll_no VARCHAR(50) NOT NULL UNIQUE,
  class_name VARCHAR(50) NOT NULL,
  section VARCHAR(20) NOT NULL,
  guardian_name VARCHAR(100),
  guardian_contact VARCHAR(20),
  contact VARCHAR(20),
  admission_date DATE,
  photo VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_student_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL
);
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Error creating students table:", err);
  } else {
    console.log("Students table created successfully");
  }

  process.exit();
});