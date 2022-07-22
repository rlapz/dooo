const express = require("express");

const api = require("../controllers/api");
const err = require("../utils/api_error");


const router = express.Router();

router.use(express.json());

router.get("/user", api.user.get_all);
router.get("/user/:id", api.user.get_by_id);

router.post("/auth/signUp", api.user.sign_up);
router.post("/auth/signIn", api.user.sign_in);

router.get("/todo", api.todo.get_all);
router.get("/todo/:id", api.todo.get_by_id);

router.use((_, res) => err.bad_request(res));


module.exports = router;
