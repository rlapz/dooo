const express = require("express");

const api = require("../controllers/api");
const err = require("../utils/api_error");


const router = express.Router();

router.use(express.json());

router.post("/auth/signUp", api.user.sign_up);
router.post("/auth/signIn", api.user.sign_in);

router.post("/user", api.user.get_by_id);
router.post("/user/remove", api.user.remove);

router.get("/todo", api.todo.get_all);
router.get("/todo/:id", api.todo.get_by_id);

router.use((_, res) => err.bad_request(res));


module.exports = router;
