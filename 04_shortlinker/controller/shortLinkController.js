const db = require("../db");
const { v4: uuidv4 } = require("uuid");

class shortLinkController {
  async makeShortLink(req, res) {
res.status(201).json("make link");
  }
  async getLink(req, res) {
      res.status(201).json("get link");
  }
    
}

module.exports = new shortLinkController();
