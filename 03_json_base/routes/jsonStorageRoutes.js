const express = require("express");
const jsonStorageController = require("../controller/jsonStoraeController")


const jsonStorageRoutes = express.Router();

jsonStorageRoutes.get("/:id", jsonStorageController.getJson);
jsonStorageRoutes.put("/", jsonStorageController.save);

module.exports = jsonStorageRoutes;
