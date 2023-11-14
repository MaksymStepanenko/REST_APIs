const express = require("express");
const shortLinkController = require("../controller/shortLinkController")


const linkRouter = express.Router();

linkRouter.get("/:shortUrl", shortLinkController.getLink);
linkRouter.post("/make-link", shortLinkController.makeShortLink);

module.exports = linkRouter;
