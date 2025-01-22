const mysql = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require("./env");
const logger = require("../utils/logger");

// สร้างการเชื่อมต่อกับฐานข้อมูล
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ทดสอบการเชื่อมต่อ
(async () => {
  try {
    const connection = await pool.getConnection();
    logger.log("Connected to MySQL database");
    connection.release(); // ปล่อย connection เมื่อทดสอบเสร็จ
  } catch (error) {
    logger.error("Failed to connect to MySQL database:", error);
  }
})();

module.exports = pool;
