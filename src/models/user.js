const db = require("../db/mariadb").pool;
const err = require("../utils/api_error");


const sql_select = "SELECT first_name, last_name, username, status FROM users";
const sql_select_auth = "SELECT username, password FROM users WHERE username = ?";
const sql_insert = "INSERT INTO users(first_name, last_name, username, " +
	"email, password, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
const sql_delete = "DELETE FROM users WHERE id = ?";


const get_by_id = async (id) => {
	let ret = {
		status: true,
		data: []
	};


	try {
		const _sql = `${sql_select} WHERE \`id\` = ?`;
		const _ret = await db.query(_sql, id);

		if (_ret.length == 0)
			return err.bad_request(null, `Id: ${id} is not valid.`);

		ret.data = _ret[0];
	} catch (e) {
		console.error(`models.user.get: ${e}`);
		return err.internal_server_error();
	}

	return ret;
}


const sign_up = async (args) => {
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


const sign_in = async (username) => {
	let ret = {
		status: true,
		data: []
	};


	try {
		ret.data = await db.query(sql_select_auth, username);
		if (ret.data.length === 0) {
			return err.unauthorized(
				null,
				"Wrong 'username' or 'password'!"
			);
		}
	} catch (e) {
		console.error(`models.user.signin: ${e}`);
		return err.internal_server_error();
	}

	return ret;
};


const remove = async (id) => {
	try {
		const _ret = await db.query(sql_delete, id);
		if (_ret.affectedRows == 0) {
			return err.bad_request(
				null,
				`Failed to delete id: ${id}.`
			);
		}
	} catch (e) {
		console.error(`models.user.remove: ${e}`);
		return err.internal_server_error();
	}

	return {status: true};
};


module.exports = {
	get_by_id,
	sign_up,
	sign_in,
	remove,
}
