const express = require("express");

const v1 = require("./apis/v1");


const router = express.Router();

router.use("/v1", v1);


module.exports = router;
