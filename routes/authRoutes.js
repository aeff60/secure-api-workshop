const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");

const router = express.Router();

// Routes สำหรับ Authentication
router.post("/register", register); // สมัครสมาชิก
router.post("/login", login); // ล็อกอิน
router.post("/refresh", refreshToken); // รับ Access Token ใหม่
router.post("/logout", logout); // ออกจากระบบ

module.exports = router;
