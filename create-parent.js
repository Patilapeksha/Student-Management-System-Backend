const db = require("./db");
const bcrypt = require("bcrypt");

async function createParent() {
  const passwordHash = await bcrypt.hash("Parent@123", 10);

  db.query(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [
      "Parent User",
      "parent@sms.local",
      passwordHash,
      "PARENT"
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return;
      }

      console.log("Parent account created successfully");
      console.log("Parent ID:", result.insertId);

      db.end();
    }
  );
}

createParent();