const db = require("../db/mariadb").pool;
const err = require("../utils/api_error");


const sql_select = "SELECT first_name, last_name, username, status FROM users";


const get_all = async () => {
	let ret = {
		status: true,
		rows: 0,
		data: []
	};


	try {
		ret.data = await db.query(sql_select);
		ret.rows = ret.data.length;
	} catch (e) {
		console.error(`models.user.get_all: ${e}`);
		err.internal_server_error();
	}

	return ret;
}


const get_by_id = async (id) => {
	const sql1 = `${sql_select} WHERE \`id\` = ?`;
	let ret = {
		status: true,
		rows: 0,
		data: []
	};


	try {
		ret.data = await db.query(sql1, [id]);
		ret.rows = ret.data.length;
	} catch (e) {
		console.error(`models.user.get_by_id: ${e}`);
		err.internal_server_error();
	}

	return ret;
};


module.exports = {
	get_all,
	get_by_id
}
