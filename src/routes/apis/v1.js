const express = require("express");

const api = require("../../controllers/api");


const router = express.Router();

router.get("/user", api.user.get);
router.get("/user/:id", api.user.get);
router.get("/todo", api.todo.get);
router.get("/todo/:id", api.todo.get);


module.exports = router;
