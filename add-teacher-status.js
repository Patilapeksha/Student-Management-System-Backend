const db = require("./db");

const sql = `
ALTER TABLE teachers
ADD COLUMN status VARCHAR(20) DEFAULT 'Active'
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Error adding status:", err);
  } else {
    console.log("Status column added successfully");
  }

  db.end();
});