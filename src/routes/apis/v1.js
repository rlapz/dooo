const express = require("express");

const capi = require("../../controllers/api");


const router = express.Router();

router.get("/user", capi.get_user);
router.get("/user/:id", capi.get_user);
router.use(async (_, res) => {
	await res.json({
		status: 404,
		result: "Not Found!"
	});
});


module.exports = router;
