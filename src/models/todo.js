const db = require("../db/mariadb").pool;


const sql_select = "SELECT title, detail, status status FROM todo";


const get_all = async () => {
	try {
		const res = await db.query(sql_select);

		return res.slice(0);
	} catch (err) {
		console.error(`models.todo.get_all: ${err}`);
	}

	return [];
}


const get_by_id = async (id) => {
	const sql1 = `${sql_select} WHERE \`id\` = ?`;


	try {
		const res = await db.query(sql1, [id]);

		return res.slice(0);
	} catch (err) {
		console.error(`models.todo.get_by_id: ${err}`);
	};

	return [];
};


module.exports = {
	get_all,
	get_by_id
}
