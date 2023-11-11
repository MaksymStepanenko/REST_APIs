const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const secretKey = process.env.JWT_SECRET;

class authController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await db.query(
      `SELECT * FROM users 
       WHERE email = $1`,
      [email]
    );

    if (!user.rows[0]) {
      return res.status(404).json({ success: false, error: "invalid email" });
    }

    const passwordCompare = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!passwordCompare) {
      return res
        .status(404)
        .json({ success: false, error: "invalid password" });
    }
    
    const { id } = user.rows[0];

    const payload = {
      id,
    };
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    await db.query(
      `
    UPDATE users
    SET accessToken = $1
    WHERE id = $2;
    `,
      [accessToken, id]
    );
    const refreshToken = user.rows[0].refreshtoken;


    res.status(201).json({
      success: true,
      data: { id, accessToken, refreshToken },
    });
  }
  async register(req, res) {
    const { email, password } = req.body;
    const users = await db.query("SELECT * FROM users");
    const verifyEmail = users.rows.some((user) => user.email === email);
    if (verifyEmail) {
      return res.status(409).json({ success: false, error: "Conflict" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const token = jwt.sign({ id }, secretKey, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id }, secretKey, { expiresIn: "1000y" });
    const newUser = await db.query(
      `INSERT INTO users (email, password, accessToken, id ,refreshToken) values ($1, $2, $3, $4, $5) RETURNING *`,
      [email, hashPassword, token, id, refreshToken]
    );

    res.status(201).json({
      success: true,
      data: { id, token, refreshToken },
    });
  }
}

module.exports = new authController();
