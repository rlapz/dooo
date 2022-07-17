const express = require("express");

const capi = require("../../controllers/api");


const router = express.Router();

router.get("/user", capi.get_user);
router.get("/user/:id", capi.get_user);


module.exports = router;
