const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Apeksha@18",
  database: "student_management_system"
});

const users = [
  {
    name: "System Admin",
    email: "admin@sms.local",
    password: "Admin@123",
    role: "ADMIN"
  },
  {
    name: "Test Teacher",
    email: "teacher@sms.local",
    password: "Teacher@123",
    role: "TEACHER"
  },
  {
    name: "Test Student",
    email: "student@sms.local",
    password: "Student@123",
    role: "STUDENT"
  }
];

async function seedUsers() {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      db.query(
        `INSERT INTO users (name, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [user.name, user.email, hashedPassword, user.role],
        (err) => {
          if (err) {
            console.log(`Error creating ${user.email}:`, err.message);
          } else {
            console.log(`${user.role} created: ${user.email}`);
          }
        }
      );
    }

    setTimeout(() => {
      db.end();
    }, 1000);
  } catch (error) {
    console.log("Seed failed:", error.message);
    db.end();
  }
}

seedUsers();