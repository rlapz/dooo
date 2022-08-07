const express = require("express");
const path = require("path");

const web = require("../controllers/web");


const router = express.Router();

router.use(express.static(path.join(__dirname, "../", "public")));

router.get("/", web.index);
router.get("/signIn", web.sign_in);
router.get("/signUp", web.sign_up);
router.get("/profile", web.profile);
router.get("/todo", web.todo);


module.exports = router;
