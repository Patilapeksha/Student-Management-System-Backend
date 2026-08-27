# Student Management System

A full-stack Student Management System developed using React, Node.js, Express.js and MySQL.

## Project Overview

The Student Management System provides role-based access for Admin, Teacher and Student users.

The system includes authentication, student management, teacher management, class management, attendance, academic records and fee management.

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML
- CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- JWT
- bcryptjs
- MySQL

## User Roles

### Admin
- Login
- Dashboard
- Manage Students
- Manage Teachers
- Manage Classes
- View Attendance Reports
- View Fee Reports
- Manage Academic Records

### Teacher
- Login
- Teacher-related functionality
- Attendance functionality
- Academic record functionality

### Student
- Login
- View profile information
- View attendance
- View fees
- View academic records

## Main Features

- User authentication
- JWT-based authentication
- Role-based authorization
- Password hashing using bcrypt
- Student management
- Student activation/deactivation
- Teacher management
- Class management
- Attendance management
- Attendance reports
- Fee management
- Fee reports
- Academic records
- Input validation
- RESTful APIs
- MySQL database

## Database

The project uses MySQL.

### Main Tables

- users
- students
- teachers
- classes
- attendance
- fees
- academic_records

### Database Relationships

- `students.user_id` → `users.id`
- `attendance.student_id` → `students.id`
- `fees.student_id` → `students.id`
- `academic_records.student_id` → `students.id`


Seed Data
The project includes seed scripts for authentication credentials and sample data.
Test Credentials
Role
Email
Password
Admin
admin@sms.local
Admin@123
Teacher
teacher@sms.local
Teacher@123
Student
student@sms.local
Student@123
Passwords are hashed using bcrypt.
Sample Data
The sample-data seed contains:
3 classes
3 teachers
15 students
API Endpoints
Authentication
Method
Endpoint
Description
Status
POST
/api/auth/login
User login
Done
Students
Method
Endpoint
Description
Status
GET
/api/students
Get all students
Done
POST
/api/students
Add student
Done
PUT
/api/students/:id
Update student
Done
PUT
/api/students/:id/deactivate
Deactivate student
Done
Teachers
Method
Endpoint
Description
Status
GET
/api/teachers
Get all teachers
Done
POST
/api/teachers
Add teacher
Done
PUT
/api/teachers/:id
Update teacher
Done
PUT
/api/teachers/:id/deactivate
Deactivate teacher
Done
Attendance
Method
Endpoint
Description
Status
POST
/api/attendance
Mark attendance
Done
GET
/api/attendance/student/:studentId
Get student attendance
Done
Fees
Method
Endpoint
Description
Status
POST
/api/fees
Add fee
Done
GET
/api/fees/student/:studentId
Get student fees
Done
Classes
Feature
Status
Classes table
Done
Sample classes
Done
Academic Records
Feature
Status
Academic records table
Done
Student academic records
Done
Note: API paths should match the routes registered in the backend application.
Backend Setup
Go to the backend directory:
cd backend
Install dependencies:
npm install
Create a .env file with your local database and JWT configuration.
Example:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=student_management_system
JWT_SECRET=your_jwt_secret
PORT=5000
Create the required database tables using the provided database scripts.
Run the authentication seed:
node seed.js
Run the sample data seed:
node seed-sample-data.js
Start the backend:
npm start
Frontend Setup
Go to the frontend directory:
cd frontend
Install dependencies:
npm install
Start the frontend:
npm run dev
Vite will display the local development URL in the terminal.
Security
Passwords are hashed using bcrypt.
JWT authentication is implemented.
Protected routes require authentication.
Role-based authorization is implemented.
Database credentials are stored using environment variables.
Real .env files should not be committed to GitHub.
Project Structure
Student-Managment-System/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── db.js
│   ├── seed.js
│   ├── seed-sample-data.js
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .env.example


This project was developed as a full-stack Student Management System assignment covering database design, backend API development, authentication, authorization and frontend integration.