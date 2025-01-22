const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack); // บันทึก error ลงไฟล์ log

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {}, // ส่งรายละเอียดเฉพาะ development
  });
};

module.exports = { errorHandler };
