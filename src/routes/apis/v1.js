const express = require("express");
const capi = require("../../controllers/api");


const router = express.Router();


router.get("/", capi.test_api);


module.exports = router;
