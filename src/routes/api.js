const express = require("express");
const v1 = require("../controllers/apis/v1");


const router = express.Router();


router.get("/v1", v1);


module.exports = router;
