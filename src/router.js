const express = require("express");

const api = require("./routes/api");
const web = require("./routes/web");
const not_found = require("./controllers/web").not_found;


const router = express.Router();

router.use("/", web);
router.use("/api", api);

/* Guard */
router.use(not_found);


module.exports = router;
