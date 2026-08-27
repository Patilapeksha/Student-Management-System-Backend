const db = require("./db");

const sql = `
ALTER TABLE users
MODIFY COLUMN role ENUM('ADMIN', 'TEACHER', 'STUDENT', 'PARENT') NOT NULL
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Database error:", err);
    return;
  }

  console.log("PARENT role added successfully");

  db.query(
    "SHOW COLUMNS FROM users LIKE 'role'",
    (err, results) => {
      if (err) {
        console.error("Verification error:", err);
        return;
      }

      console.log(results);
      db.end();
    }
  );
});