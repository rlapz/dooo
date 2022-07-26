const express = require("express");

const web = require("../controllers/web");


const router = express.Router();

router.get("/", web.index);
router.get("/signIn", web.sign_in);
router.get("/signUp", web.sign_up);
router.get("/profile", web.profile);
router.get("/todo", web.todo);

router.use(web.not_found);


module.exports = router;
