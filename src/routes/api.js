const express = require("express");

const v1 = require("./apis/v1");


const router = express.Router();

router.use("/v1", v1);
router.use(async (_, res) => {
	await res.status(400).json({
		status: 400,
		result: "Bad Request!"
	});
});


module.exports = router;
