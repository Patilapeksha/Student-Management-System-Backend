const http = require("http");

function loginAndTest(email, password, role) {
  const loginData = JSON.stringify({
    email,
    password
  });

  const loginOptions = {
    hostname: "localhost",
    port: 5000,
    path: "/api/auth/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(loginData)
    }
  };

  const loginRequest = http.request(loginOptions, (loginResponse) => {
    let body = "";

    loginResponse.on("data", (chunk) => {
      body += chunk;
    });

    loginResponse.on("end", () => {
      console.log(`\n${role} Login Status:`, loginResponse.statusCode);

      if (loginResponse.statusCode !== 200) {
        console.log(`${role} Login Response:`, body);
        return;
      }

      const result = JSON.parse(body);
      const token = result.token;

      const protectedOptions = {
        hostname: "localhost",
        port: 5000,
        path: "/api/admin/test",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const protectedRequest = http.request(
        protectedOptions,
        (protectedResponse) => {
          let protectedBody = "";

          protectedResponse.on("data", (chunk) => {
            protectedBody += chunk;
          });

          protectedResponse.on("end", () => {
            console.log(
              `${role} Admin Route Status:`,
              protectedResponse.statusCode
            );
            console.log(
              `${role} Admin Route Response:`,
              protectedBody
            );
          });
        }
      );

      protectedRequest.on("error", (error) => {
        console.error(`${role} Protected Error:`, error.message);
      });

      protectedRequest.end();
    });
  });

  loginRequest.on("error", (error) => {
    console.error(`${role} Login Error:`, error.message);
  });

  loginRequest.write(loginData);
  loginRequest.end();
}

loginAndTest("admin@sms.local", "Admin@123", "Admin");

loginAndTest("teacher@sms.local", "Teacher@123", "Teacher");

loginAndTest("student@sms.local", "Student@123", "Student");