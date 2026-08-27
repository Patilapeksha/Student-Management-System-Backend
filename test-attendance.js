const http = require("http");

const loginData = JSON.stringify({
  email: "admin@sms.local",
  password: "Admin@123"
});

const attendanceData = JSON.stringify({
  student_id: 1,
  attendance_date: "2026-08-25",
  status: "PRESENT",
  remarks: "Present"
});

function request(options, data, callback) {
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

// Admin Login
request(
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

    const token = JSON.parse(loginBody).token;

    console.log("Admin login successful.");

    // Mark Attendance
    request(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/attendance",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Length": Buffer.byteLength(attendanceData)
        }
      },
      attendanceData,
      (status, body) => {
        console.log("Attendance Status:", status);
        console.log("Attendance Response:", body);
      }
    );
  }
);