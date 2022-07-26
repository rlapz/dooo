const db = require("../db");
const err = require("../ApiError");


const select = async (id) => {
	const sql = "SELECT id, first_name, last_name, username, " +
		" email, status FROM users WHERE id = ?";

	let ret = await db.query(
		{sql, bigIntAsNumber: true},
		id
	);


	if (ret.length == 0)
		throw err.badRequest("No data");

	ret = ret[0];
	if (!ret.status)
		throw err.forbidden("This account is dactivated");

	return {
		id: ret.id,
		first_name: ret.first_name,
		last_name: ret.last_name,
		username: ret.username,
		email: ret.email,
		password: ret.password,
		status: ret.status,
	}
}


const sign_up = async (first_name, last_name, username, email, pass) => {
	const sql = "INSERT INTO users(first_name, last_name, " +
		"username, email, password, status, created_at) " +
		"VALUES (?, ?, ?, ?, ?, ?, ?)";

	const ret = await db.query(sql, [
		first_name,
		last_name,
		username,
		email,
		pass,
		true,
		new Date()
	]);


	if (ret.affectedRows == 0)
		throw err.internalServerError("Failed to create new account");
}


const sign_in = async (username) => {
	const sql = "SELECT id, username, password, status FROM users " +
		"WHERE username = ?";

	let ret = await db.query(
		{sql, bigIntAsNumber: true},
		username
	);


	if (ret.length == 0)
		throw err.unauthorized("Wrong 'username' or 'password'");

	ret = ret[0];
	if (!ret.status)
		throw err.forbidden("This account is dactivated");

	return {
		id: ret.id,
		username: ret.username,
		password: ret.password,
	}
}


const remove = async (id) => {
	const sql = "DELETE FROM users WHERE id = ? AND status = true";
	const ret = await db.query(sql, id);


	if (ret.affectedRows == 0) {
		throw err.forbidden(
			"Failed to remove this account. " +
			"Make sure it is not deactivated"
		);
	}
}


const update = async (id, f_name, l_name, username, email, password) => {
	let sql = "UPDATE users SET ";
	let values = [];


	if (f_name) {
		sql += "first_name = ?, ";
		values.push(f_name);
	}

	if (l_name) {
		sql += "last_name = ?, ";
		values.push(l_name);
	}

	if (username) {
		sql += "username = ?, ";
		values.push(username);
	}

	if (email) {
		sql += "email = ?, ";
		values.push(email);
	}

	if (password) {
		sql += "password = ?, ";
		values.push(password);
	}

	if (values.length <= 2)
		throw err.badRequest("No update");


	sql += "updated_at = ? ";
	values.push(new Date());

	sql += "WHERE id = ? AND status = true";
	values.push(id);


	let ret = await db.query(sql, values);

	if (ret.affectedRows == 0) {
		throw err.forbidden(
			"Failed to update this account. " +
			"Make sure it is not deactivated"
		);
	}
}


module.exports = {
	select,
	sign_up,
	sign_in,
	remove,
	update,
};
