const express = require("express");
const process = require("process");
const dotenv = require("dotenv");

const mariadb = require("./db/mariadb");
const router = require("./router");


const port = process.env.PORT || 8000;
const app = express();


dotenv.config();
process.chdir(__dirname);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(router);

const server = app.listen(port, () => {
	console.log(`Serving... ${port}`);
});

const signal_handler = () => {
	mariadb.pool.end();
	server.close(() => console.log("Server stopped!"));
};

process.on("SIGTERM", signal_handler);
process.on("SIGINT", signal_handler);
