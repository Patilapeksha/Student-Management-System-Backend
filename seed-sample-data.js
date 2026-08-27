require("dotenv").config();

const db = require("./db");

// 3 sample classes
const classes = [
  ["10", "A", "2026-2027"],
  ["9", "A", "2026-2027"],
  ["8", "B", "2026-2027"]
];

// 3 sample teachers
const teachers = [
  ["Rahul Sharma", "rahul.teacher@sms.local", "9876500001", "Mathematics"],
  ["Priya Singh", "priya.teacher@sms.local", "9876500002", "Science"],
  ["Amit Kumar", "amit.teacher@sms.local", "9876500003", "English"]
];

// 15 sample students
const students = [
  ["Aarav Sharma", "STU001", "10", "A", "Rajesh Sharma", "9876501001", "9876502001", "2026-06-01"],
  ["Ananya Patel", "STU002", "10", "A", "Suresh Patel", "9876501002", "9876502002", "2026-06-01"],
  ["Rohan Kumar", "STU003", "10", "A", "Mohan Kumar", "9876501003", "9876502003", "2026-06-02"],
  ["Sneha Reddy", "STU004", "10", "A", "Ravi Reddy", "9876501004", "9876502004", "2026-06-02"],
  ["Vivek Singh", "STU005", "10", "A", "Raj Singh", "9876501005", "9876502005", "2026-06-03"],

  ["Isha Sharma", "STU006", "9", "A", "Amit Sharma", "9876501006", "9876502006", "2026-06-03"],
  ["Arjun Patel", "STU007", "9", "A", "Mahesh Patel", "9876501007", "9876502007", "2026-06-04"],
  ["Kavya Rao", "STU008", "9", "A", "Sanjay Rao", "9876501008", "9876502008", "2026-06-04"],
  ["Aditya Verma", "STU009", "9", "A", "Rakesh Verma", "9876501009", "9876502009", "2026-06-05"],
  ["Neha Joshi", "STU010", "9", "A", "Vijay Joshi", "9876501010", "9876502010", "2026-06-05"],

  ["Karan Mehta", "STU011", "8", "B", "Ramesh Mehta", "9876501011", "9876502011", "2026-06-06"],
  ["Pooja Nair", "STU012", "8", "B", "Manoj Nair", "9876501012", "9876502012", "2026-06-06"],
  ["Dev Shah", "STU013", "8", "B", "Ashok Shah", "9876501013", "9876502013", "2026-06-07"],
  ["Meera Iyer", "STU014", "8", "B", "Suresh Iyer", "9876501014", "9876502014", "2026-06-07"],
  ["Yash Gupta", "STU015", "8", "B", "Anil Gupta", "9876501015", "9876502015", "2026-06-08"]
];

// Add classes
db.query(
  `INSERT IGNORE INTO classes
   (class_name, section, academic_year)
   VALUES ?`,
  [classes],
  (err) => {
    if (err) {
      console.error("Error adding classes:", err.message);
      return db.end();
    }

    console.log("3 Classes added successfully");

    // Add teachers
    db.query(
      `INSERT IGNORE INTO teachers
       (name, email, phone, subject)
       VALUES ?`,
      [teachers],
      (err) => {
        if (err) {
          console.error("Error adding teachers:", err.message);
          return db.end();
        }

        console.log("3 Teachers added successfully");

        // Add students
        db.query(
          `INSERT IGNORE INTO students
           (name, roll_no, class_name, section,
            guardian_name, guardian_contact, contact, admission_date)
           VALUES ?`,
          [students],
          (err) => {
            if (err) {
              console.error("Error adding students:", err.message);
            } else {
              console.log("15 Students added successfully");
              console.log("Sample data seed completed successfully");
            }

            db.end();
          }
        );
      }
    );
  }
);