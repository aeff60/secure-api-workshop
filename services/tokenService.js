const jwt = require("jsonwebtoken");
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = require("../config/env");

class TokenService {
  // สร้าง Access Token
  static generateAccessToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  // สร้าง Refresh Token
  static generateRefreshToken(user) {
    return jwt.sign(
      { id: user.id, username: user.username },
      REFRESH_TOKEN_SECRET
    );
  }

  // ยืนยัน Token
  static verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }
}

module.exports = TokenService;
