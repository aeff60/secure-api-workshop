const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // เพิ่มข้อมูลผู้ใช้ลงใน req เพื่อใช้งานใน endpoint อื่น
    next();
  });
};

module.exports = { authenticate };
