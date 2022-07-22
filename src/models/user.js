const db = require("../db/mariadb").pool;
const err = require("../utils/api_error");


const sql_select = "SELECT first_name, last_name, username, status FROM users";
const sql_select_auth = "SELECT username, password FROM users WHERE username = ?";
const sql_insert = "INSERT INTO users(first_name, last_name, username, " +
	"email, password, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";


const get = async (arg) => {
	let ret = {
		status: true,
		rows: 0,
		data: []
	};


	try {
		let _arg;
		let _sql = sql_select;

		if (arg) {
			const __arg = Object.entries(arg)[0];
			_sql = `${sql_select} WHERE \`${__arg[0]}\` = ?`;
			_arg = __arg[1];
		}

		ret.data = await db.query(_sql, _arg);
		ret.rows = ret.data.length;
	} catch (e) {
		console.error(`models.user.get_all: ${e}`);
		return err.internal_server_error();
	}

	return ret;
}


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

			return err.bad_request(null, r);
		}

		console.error(`models.user.signup: ${e}`);
		return err.internal_server_error();
	}

	return {status: true};
};


const signin = async (username) => {
	let ret = {
		status: true,
	};


	try {
		ret.data = await db.query(sql_select_auth, username);
		if (ret.data.length == 0)
			ret.status = false;
	} catch (e) {
		console.error(`models.user.get_by_id: ${e}`);
		return err.internal_server_error();
	}

	return ret;
};


module.exports = {
	get,
	signup,
	signin,
}
