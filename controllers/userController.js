const pool = require("../config/db");
const logger = require("../utils/logger");

// ดึงข้อมูลผู้ใช้ทั้งหมด
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, username FROM users");
    res.json(rows);
  } catch (error) {
    logger.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ดึงข้อมูลผู้ใช้ตาม ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT id, username FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    logger.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// อัปเดตโปรไฟล์ผู้ใช้
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    await pool.query("UPDATE users SET username = ? WHERE id = ?", [
      username,
      id,
    ]);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    logger.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// ลบผู้ใช้
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
