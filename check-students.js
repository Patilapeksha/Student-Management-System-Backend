require("dotenv").config();

const db = require("./db");

db.query("DESCRIBE students", (err, results) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.table(results);
  }

  process.exit();
});