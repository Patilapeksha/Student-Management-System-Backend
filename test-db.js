const db = require("./db");

db.query("SELECT 1 AS test", (err, results) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("Database connected successfully:", results);
  }

  process.exit();
});