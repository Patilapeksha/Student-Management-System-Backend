const http = require("http");

const loginData = JSON.stringify({
  email: "student@sms.local",
  password: "Student@123"
});

const profileData = JSON.stringify({
  name: "Rahul Sharma",
  guardian_name: "Rajesh Sharma",
  guardian_contact: "9876543210",
  contact: "9876543211"
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

    const token = JSON.parse(loginBody).token;

    console.log("Student login successful.");

    // Update profile
    request(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/student-profile/me",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Length": Buffer.byteLength(profileData)
        }
      },
      profileData,
      (status, body) => {
        console.log("Update Profile Status:", status);
        console.log("Update Profile Response:", body);
      }
    );
  }
);