const dotenv = require("dotenv");


dotenv.config();

const server = {
	port: process.env.PORT || 8000,
};

const user = {
	access_token: process.env.ACCESS_TOKEN,
	refresh_token: process.env.REFRESH_TOKEN,
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
	user,
	db
};
