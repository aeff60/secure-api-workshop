const rateLimit = require("express-rate-limit");

// กำหนด Rate Limit สำหรับการใช้งาน API ทั่วไป
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 100, // จำกัด 100 requests ต่อ IP
  message: {
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
});

// กำหนด Rate Limit สำหรับการล็อกอินโดยเฉพาะ
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 5, // จำกัด 5 requests ต่อ IP สำหรับ /login
  message: {
    message: "Too many login attempts, please try again after 15 minutes.",
  },
});

module.exports = { apiLimiter, loginLimiter };
