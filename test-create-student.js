const http = require("http");

const loginData = JSON.stringify({
  email: "admin@sms.local",
  password: "Admin@123"
});

function makeRequest(options, data, callback) {
  const req = http.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      callback(res.statusCode, body);
    });
  });

  req.on("error", (error) => {
    console.error("Request Error:", error);
  });

  if (data) {
    req.write(data);
  }

  req.end();
}

// Step 1: Login
makeRequest(
  {
    hostname: "localhost",
    port: 5000,
    path: "/api/auth/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(loginData)
    }
  },
  loginData,
  (loginStatus, loginBody) => {
    console.log("Login Status:", loginStatus);

    if (loginStatus !== 200) {
      console.log("Login Response:", loginBody);
      return;
    }

    const loginResult = JSON.parse(loginBody);
    const token = loginResult.token;

    console.log("Admin login successful.");

    // Step 2: Create student
    const studentData = JSON.stringify({
      name: "Rahul Sharma",
      roll_no: "STU001",
      class_name: "10",
      section: "A",
      guardian_name: "Rajesh Sharma",
      guardian_contact: "9876543210",
      contact: "9876543211",
      admission_date: "2026-06-01",
      photo: null
    });

    makeRequest(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/students",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Length": Buffer.byteLength(studentData)
        }
      },
      studentData,
      (studentStatus, studentBody) => {
        console.log("Create Student Status:", studentStatus);
        console.log("Create Student Response:", studentBody);
      }
    );
  }
);