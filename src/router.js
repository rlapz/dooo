const express = require("express");
const home = require("./routes/home");
const api = require("./routes/api");


const router = express.Router();


router.use("/", home);
router.use("/api", api);
router.use(async (_, res) => {
	await res.status(404).send("Not Found!");
});


module.exports = router;
