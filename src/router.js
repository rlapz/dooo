const express = require("express");
const home = require("./routes/home");


const router = express.Router();


router.use("/", home);
router.use((_, res) => res.status(404).send("Not Found!"));


module.exports = router;
