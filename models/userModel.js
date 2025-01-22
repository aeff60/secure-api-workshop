const pool = require("../config/db");

class UserModel {
  // ดึงข้อมูลผู้ใช้ทั้งหมด
  static async getAllUsers() {
    const [rows] = await pool.query("SELECT id, username, email FROM users");
    return rows;
  }

  // ดึงข้อมูลผู้ใช้ตาม ID
  static async getUserById(id) {
    const [rows] = await pool.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  // สร้างผู้ใช้ใหม่
  static async createUser(username, email, hashedPassword) {
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    return result.insertId;
  }

  // อัปเดตข้อมูลผู้ใช้
  static async updateUser(id, username, email) {
    const [result] = await pool.query(
      "UPDATE users SET username = ?, email = ? WHERE id = ?",
      [username, email, id]
    );
    return result.affectedRows;
  }

  // ลบผู้ใช้
  static async deleteUser(id) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = UserModel;
