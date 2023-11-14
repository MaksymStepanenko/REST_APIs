const db = require("../db");
const { v4: uuidv4 } = require("uuid");

class jsonStorageController {
  async save(req, res) {
    const jsonData = req.body;
    const id = uuidv4();
    await db.query(
      `INSERT INTO jsondb (id, json_data) values ($1, $2) RETURNING *`,
      [id, jsonData]
    );
    res.status(201).json({
      message: `Your link to get json files: http://localhost:3000/${id}`,
    });
  }
  async getJson(req, res) {
    const { id } = req.params;
    const data = await db.query(
      `SELECT * FROM jsondb
       WHERE id = $1`,
      [id]
    );

    const jsonData = data.rows[0];

    if (!jsonData) {
      return res
        .status(404)
        .json({ error: `not found your data with id:${id}` });
    }

    res.status(201).json(jsonData);
  }
}

module.exports = new jsonStorageController();
