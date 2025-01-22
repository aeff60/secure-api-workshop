const express = require("express");
const { authenticate } = require("../middlewares/authenticate");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Routes สำหรับข้อมูลผู้ใช้
router.get("/", authenticate, getAllUsers); // ดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/:id", authenticate, getUserById); // ดึงข้อมูลผู้ใช้ตาม ID
router.put("/:id", authenticate, updateUser); // อัปเดตข้อมูลผู้ใช้
router.delete("/:id", authenticate, deleteUser); // ลบผู้ใช้

module.exports = router;
