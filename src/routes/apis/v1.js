const express = require("express");

const capi = require("../../controllers/api");


const router = express.Router();

router.get("/", capi.get_test);
router.use(async (_, res) => {
	await res.json({
		status: false,
		result: "404 Not Found!"
	});
});


module.exports = router;
