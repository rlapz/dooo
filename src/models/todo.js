const db = require("../db/mariadb").pool;
const err = require("../utils/api_error");


const sql_select = "SELECT title, detail, status FROM todo";


const get_all = async () => {
	let ret = {
		status: true,
		rows: 0,
		data: [],
	};


	try {
		const _ret = await db.query(sql_select);

		ret.data = _ret;
		ret.rows = _ret.length;

		if (_ret.length > 0)
			ret.data = _ret[0];
	} catch (e) {
		console.error(`models.todo.get_all: ${e}`);
		return err.internal_server_error();
	}

	return ret;
}


const get_by_id = async (id) => {
	const sql1 = `${sql_select} WHERE \`id\` = ?`;
	let ret = {
		status: true,
		data: null,
	};


	try {
		const _ret = await db.query(sql1, [id]);

		if (_ret.length > 0)
			ret.data = _ret[0];
	} catch (e) {
		console.error(`models.todo.get_by_id: ${e}`);
		return err.internal_server_error();
	};

	return ret;
};


module.exports = {
	get_all,
	get_by_id
}
