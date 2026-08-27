const db = require("./db");

db.query(
  `SELECT id FROM users WHERE email = ?`,
  ["student@sms.local"],
  (err, users) => {
    if (err) {
      console.error("Database error:", err);
      return;
    }

    if (users.length === 0) {
      console.log("Student user not found");
      return;
    }

    const userId = users[0].id;

    db.query(
      `UPDATE students
       SET user_id = ?
       WHERE id = ?`,
      [userId, 1],
      (err) => {
        if (err) {
          console.error("Update error:", err);
          return;
        }

        console.log("Student linked successfully");
        console.log("User ID:", userId);
        console.log("Student ID: 1");

        db.end();
      }
    );
  }
);