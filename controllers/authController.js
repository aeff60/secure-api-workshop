const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = require("../config/env");
const logger = require("../utils/logger");

let refreshTokens = [];

// สมัครสมาชิก
const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    logger.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

// ล็อกอิน
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      REFRESH_TOKEN_SECRET
    );

    refreshTokens.push(refreshToken);

    res.json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    logger.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};

// Refresh Token
const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh Token is required" });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Invalid Refresh Token" });
  }

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken });
  });
};

// Logout
const logout = (req, res) => {
  const { token } = req.body;

  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.status(204).send();
};

module.exports = { register, login, refreshToken, logout };
