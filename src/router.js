const express = require("express");

const api = require("./routes/api");
const web = require("./routes/web");


const router = express.Router();

router.use("/", web);
router.use("/api", api);
router.use((_, res) => res.status(404).send("Not Found"));


module.exports = router;
