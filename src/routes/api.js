const express = require("express");

const capi = require("../controllers/api");
const v1 = require("./apis/v1");


const router = express.Router();

router.use("/v1", v1);
router.use(capi.bad_request);


module.exports = router;
