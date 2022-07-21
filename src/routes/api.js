const express = require("express");

const api = require("../controllers/api");
const err = require("../utils/error");


const router = express.Router();

router.get("/user", api.user.get);
router.get("/user/:id", api.user.get);

router.get("/todo", api.todo.get);
router.get("/todo/:id", api.todo.get);

router.use((_, res) => {
	const e = err.bad_request();

	res.status(e.errno).json(e);
});


module.exports = router;
