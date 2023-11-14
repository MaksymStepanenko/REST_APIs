const express = require("express");
const controller = require("../controller/controller");

const router = express.Router();

router.get("/check-ip/:ip", controller.checkIP);
router.get("/", controller.getRealIPInfo);

module.exports = router;
