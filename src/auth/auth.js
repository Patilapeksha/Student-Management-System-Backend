const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");

async function login(req, res) {
  const { email, password } = req.body;

  // Validate input
  if (!email || typeof email !== "string") {
    return res.status(400).json({
      success: false,
      message: "Valid email is required"
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      success: false,
      message: "Password is required"
    });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ? AND is_active = TRUE",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const user = results[0];

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
  );
}

module.exports = { login };