const http = require("http");

const loginData = JSON.stringify({
  email: "admin@sms.local",
  password: "Admin@123"
});

const academicData = JSON.stringify({
  student_id: 1,
  subject: "Mathematics",
  marks: 85,
  grade: "A",
  academic_year: "2026-27"
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

    // Add Academic Record
    request(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/academic",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Length": Buffer.byteLength(academicData)
        }
      },
      academicData,
      (status, body) => {
        console.log("Academic Status:", status);
        console.log("Academic Response:", body);
      }
    );
  }
);