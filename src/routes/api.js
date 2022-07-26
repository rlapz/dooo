const express = require("express");

const api = require("../controllers/api");
const token = require("../middlewares/token");
const ApiError = require("../ApiError");


const router = express.Router();

router.use(express.json());

router.post("/auth/signUp", api.user.sign_up);
router.post("/auth/signIn", api.user.sign_in);

router.get("/user", token.verify, api.user.select);
router.put("/user", token.verify, api.user.update);
router.delete("/user", token.verify, api.user.remove);


router.use((_, __, next) => {
	next(ApiError.badRequest());
});

router.use((err, _, res, __) => {
	if (err instanceof ApiError) {
		res.status(err.errno).json({message: err.message});
	} else if (err.type == "entity.parse.failed") {
		res.status(err.status).json({message: "Invalid JSON"});
	} else {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error"
		});
	}
});


module.exports = router;
