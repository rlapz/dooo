const express = require("express");
const process = require("process");
const router = require("./router");


const port = process.env.PORT || 8000;
const app = express();


process.chdir(__dirname);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(router);

const server = app.listen(port, () => {
	console.log(`Serving... ${port}`);
});

const signal_handler = () => {
	server.close(() => console.log("Server stopped!"));
};

process.on("SIGTERM", signal_handler);
process.on("SIGINT", signal_handler);
