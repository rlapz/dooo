const express = require("express");

const api = require("../controllers/api");
const err = require("../utils/api_error");


const router = express.Router();

router.get("/user", api.user.get_all);
router.get("/user/:id", api.user.get_by_id);

router.get("/todo", api.todo.get_all);
router.get("/todo/:id", api.todo.get_by_id);

router.use((_, res) => {
	const e = err.bad_request();

	res.status(e.errno).json(e);
});


module.exports = router;
