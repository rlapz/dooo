const express = require("express");
const process = require("process");
const router = require("./router");


const port = process.env.PORT || 8000;
const app = express();


process.chdir(__dirname);
app.set("view engine", "ejs");

app.use(router);

app.listen(port, () => {
	console.log(`Serving... ${port}`);
});
