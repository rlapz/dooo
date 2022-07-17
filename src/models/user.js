const db = require("../db/mariadb").pool;


const sql_select = "SELECT first_name, last_name, username, status FROM users";


const get_all = async () => {
	try {
		const res = await db.query({bigIntAsNumber: true, sql: sql_select});

		return res.slice(0);
	} catch (err) {
		console.error(`models.user.get_all: ${err}`);
	}

	return [];
}


const get_by_id = async (id) => {
	const sql1 = `${sql_select} WHERE \`id\` = ?`;


	try {
		const res = await db.query({bigIntAsNumber: true, sql: sql1}, [id]);

		return res.slice(0);
	} catch (err) {
		console.error(`models.user.get_by_id: ${err}`);
	};

	return [];
};


module.exports = {
	get_all,
	get_by_id
}
