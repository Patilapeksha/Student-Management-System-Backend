const db = require("./db");

db.query(
  "SELECT id, name, email, role FROM users WHERE role = 'PARENT'",
  (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return;
    }

    console.log("Parent accounts:");
    console.log(results);

    db.end();
  }
);