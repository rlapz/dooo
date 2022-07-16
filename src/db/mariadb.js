const db = require("mariadb");


const env = process.env;
const pool = db.createPool({
	user: env.DB_USER,
	password: env.DB_PASS,
	host: env.DB_HOST,
	database: env.DB_NAME,
	connectionLimit: process.env.DB_CONN_LIM
});


module.exports = {
	pool
};
