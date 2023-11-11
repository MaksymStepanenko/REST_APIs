const db = require("../db");
require("dotenv").config();

class userController {
  async current(req, res) {
    const { id, email } = req.user;
    res.status(201).json({
      success: true,
      data: {
        id,
        email,
      },
    });
  }
}

module.exports = new userController();
