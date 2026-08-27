const db = require("./db");

db.query(
  "SELECT id FROM users WHERE email = ? AND role = 'PARENT'",
  ["parent@sms.local"],
  (err, users) => {
    if (err) {
      console.error("Database error:", err);
      return;
    }

    if (users.length === 0) {
      console.log("Parent account not found");
      db.end();
      return;
    }

    const parentId = users[0].id;

    db.query(
      "UPDATE students SET parent_user_id = ? WHERE id = ?",
      [parentId, 1],
      (err) => {
        if (err) {
          console.error("Link error:", err);
          db.end();
          return;
        }

        console.log("Parent linked to student successfully");
        console.log("Parent ID:", parentId);
        console.log("Student ID: 1");

        db.end();
      }
    );
  }
);