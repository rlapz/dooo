const express = require("express");
const capi = require("../../controllers/api");


const router = express.Router();


router.get("/", capi.get_test);


module.exports = router;
