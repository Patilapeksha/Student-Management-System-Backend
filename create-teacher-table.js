const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  subject VARCHAR(100)
)
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Error creating teachers table:", err);
  } else {
    console.log("Teachers table created successfully");
  }

  db.end();
});