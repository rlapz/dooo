const express = require("express");
const controller = require("../controllers/root");


const root = express.Router();


root.get("/", controller.index);


module.exports = root;
