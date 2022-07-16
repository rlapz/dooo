const db = require("mariadb");

const config = require("../config");


const pool = db.createPool(config.db)

module.exports = {
	pool
};
