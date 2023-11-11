const express = require("express");
const authController = require("../controller/authController");

const authRouter = express.Router();

authRouter.post("/sign-in", authController.login);
authRouter.post("/sign-up", authController.register);

module.exports = authRouter;
