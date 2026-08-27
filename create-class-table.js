require("dotenv").config();

const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_name VARCHAR(50) NOT NULL,
  section VARCHAR(20) NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  class_teacher_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_class_section_year
    (class_name, section, academic_year)
);
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Error creating classes table:", err);
  } else {
    console.log("Classes table created successfully");
  }

  process.exit();
});