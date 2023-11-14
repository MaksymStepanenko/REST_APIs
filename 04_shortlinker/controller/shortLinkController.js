const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const randomstring = require("randomstring");
const validator = require("validator");

class shortLinkController {
  async makeShortLink(req, res) {
    const data = req.body;
    const origLink = data.url;
    if (!validator.isURL(origLink)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }
    const shortUrl = randomstring.generate(4);
    const id = uuidv4();
    await db.query(
      `INSERT INTO links (id, short_url, orig_url) values ($1, $2, $3) RETURNING *`,
      [id, shortUrl, origLink]
    );
    res.status(201).json({
      message: "link create successfully",
      link: `http://localhost:3000/${shortUrl}`,
    });
  }
  async getLink(req, res) {
    const { shortUrl } = req.params;
    const data = await db.query(
      `SELECT * FROM links
       WHERE short_url = $1`,
      [shortUrl]
    );
    const url = data.rows.length > 0 ? data.rows[0].orig_url : null;

    if (url) {
      const absoluteUrl = url.startsWith("http") ? url : `http://${url}`;
      res.redirect(absoluteUrl);
    } else {
      res.status(404).send({ error: "URL not found" });
    }
  }
}

module.exports = new shortLinkController();
