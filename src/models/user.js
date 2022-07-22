const db = require("../db/mariadb").pool;
const err = require("../utils/api_error");


const sql_select = "SELECT first_name, last_name, username, status FROM users";
const sql_insert = "INSERT INTO users(first_name, last_name, username, " +
	"email, password, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";


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
		return err.internal_server_error();
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
		return err.internal_server_error();
	}

	return ret;
};


const signup = async (args) => {
	try {
		await db.query(sql_insert, args);
	} catch (e) {
		if (e.errno === 1062) {
			const sp = e.text.split(" ");
			const field = sp.at(-1).replace(/['"]+/g, "")
			const val = sp.at(2);
			let r = null;


			if (field === "username")
				r = `Username ${val} is already registered!`;
			else if (field === "email")
				r = `Email ${val} is already registered!`;

			return err.bad_request(r);
		}

		console.error(`models.user.signup: ${e}`);
		return err.internal_server_error();
	}

	return {status: true};
};


module.exports = {
	get_all,
	get_by_id,
	signup,
}
