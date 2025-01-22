require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./utils/logger");
const { errorHandler } = require("./middlewares/errorHandler");
const { apiLimiter, loginLimiter } = require("./middlewares/rateLimiter");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // ป้องกันการโจมตีด้วยการตั้งค่า HTTP Headers
app.use(cors()); // อนุญาตให้เข้าถึง API จาก Origins ที่กำหนด
app.use(express.json()); // ใช้สำหรับแปลง JSON ใน request body

// Routes
app.use("/api/auth", authRoutes); // เส้นทางเกี่ยวกับ Authentication
app.use("/api/users", userRoutes); // เส้นทางเกี่ยวกับข้อมูลผู้ใช้
// ใช้ Rate Limiter สำหรับ API ทั้งหมด
app.use("/api", apiLimiter);

// ใช้ Rate Limiter เฉพาะเส้นทาง /api/auth/login
app.use("/api/auth/login", loginLimiter);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
