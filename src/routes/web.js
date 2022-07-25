const express = require("express");

const web = require("../controllers/web");


const router = express.Router();

router.get("/", web.index);
//router.get("/signin");
//router.get("/signup");
//router.get("/todo");
//router.get("/profile");


module.exports = router;
