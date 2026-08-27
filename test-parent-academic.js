const http = require("http");

const loginData = JSON.stringify({
  email: "parent@sms.local",
  password: "Parent@123"
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

// Parent Login
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

    console.log("Parent login successful.");

    // Get Child Academic Records
    request(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/parent/child/academic",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      null,
      (status, body) => {
        console.log("Child Academic Status:", status);
        console.log("Child Academic Response:", body);
      }
    );
  }
);