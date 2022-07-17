const db = require("../db/mariadb");


const select = async (id) => {
	if (!id)
		return db.pool.query("SELECT * FROM users;");

	return db.pool.query("SELECT * FROM users WHERE `id` = ?;", [id]);
}


module.exports = {
	select,
}
