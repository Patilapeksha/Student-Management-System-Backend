const db = require("./db");

const sql = `
ALTER TABLE students
ADD COLUMN parent_user_id INT NULL
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Database error:", err);
    return;
  }

  console.log("Parent link added successfully");
  db.end();
});