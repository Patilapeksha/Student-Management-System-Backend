const http = require("http");

const loginData = JSON.stringify({
  email: "admin@sms.local",
  password: "Admin@123"
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

    request(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/attendance/student/1",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      null,
      (status, body) => {
        console.log("Get Attendance Status:", status);
        console.log("Get Attendance Response:", body);
      }
    );
  }
);