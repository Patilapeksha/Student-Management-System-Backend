const http = require("http");

const loginData = JSON.stringify({
  email: "student@sms.local",
  password: "Student@123"
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

// Student Login
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

    const result = JSON.parse(loginBody);
    const token = result.token;

    console.log("Student login successful.");

    // Get own profile
    request(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/student-profile/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      null,
      (status, body) => {
        console.log("Profile Status:", status);
        console.log("Profile Response:", body);
      }
    );
  }
);