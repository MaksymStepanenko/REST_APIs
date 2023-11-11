const express = require("express");
const userController = require("../controller/userController");
const authenticate = require("../middlewares/authenticate");

const userRouter = express.Router();

userRouter.get("/me",authenticate, userController.current);


module.exports = userRouter;
