const dotenv = require("dotenv");


dotenv.config();

const server = {
	port: process.env.PORT || 8000,
};

const db = {
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	connectionLimit: process.env.DB_CONN_LIM
};


module.exports = {
	server,
	db
};
