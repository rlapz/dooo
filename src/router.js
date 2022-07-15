const express = require("express");
const root = require("./routes/root");


const router = express.Router();


router.use("/", root);
router.use((_, res) => res.status(404).send("Not Found!"));


module.exports = router;
