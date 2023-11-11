const jwt = require("jsonwebtoken");
const db = require("../db");

const secretKey = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { id } = jwt.verify(token, secretKey);
    const user = await db.query(
      `SELECT * FROM users 
       WHERE id = $1`,
      [id]
    );
    const findUser = user.rows[0]
    if (!findUser || !findUser.accesstoken) {
      console.log("user.token");
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = findUser;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticate;
