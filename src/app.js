const express = require("express");
const process = require("process");

const config = require("./config");
const mariadb = require("./db/mariadb");
const router = require("./router");


process.chdir(__dirname);

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(router);

const port = config.server.port;
const server = app.listen(port, () => {
	console.log(`Serving... ${port}`);
});

const signal_handler = async () => {
	server.close(() => console.log("Server stopped!"));
	await mariadb.pool.end();
};

process.on("SIGTERM", signal_handler);
process.on("SIGINT", signal_handler);
