const db = require("../db");
const err = require("../ApiError");


const get_by_id = async (id) => {
	const sql = "SELECT todo.id, title, detail, todo.status, " +
		"user_status " +
		"FROM todo INNER JOIN users " +
		"ON todo.user_id = users.id WHERE todo.id = ?";

	let ret = await db.query(
		{sql, bigIntAsNumber: true},
		[id, user_id]
	);

	if (ret.length == 0)
		throw err.badRequest(`id: '${id}' is not valid`);

	ret = ret[0];
	if (!ret.user_status)
		throw err.forbidden("This account is dactivated");


	return {
		id: ret.id,
		title: ret.title,
		detail: ret.detail,
		status: ret.status,
	};
}


module.exports = {
	get_by_id,
}
