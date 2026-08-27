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

// Login first
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

    // Get all students
    makeRequest(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/students",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      null,
      (studentStatus, studentBody) => {
        console.log("Get Students Status:", studentStatus);
        console.log("Get Students Response:", studentBody);
      }
    );
  }
);