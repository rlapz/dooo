const bcrypt = require("bcrypt");

const user_model = require("../../models/user");
const err = require("../../utils/api_error");


const get_all = async (_, res) => {
	res.status(200).json(await user_model.get_all());
};


const get_by_id = async (req, res, next) => {
	const id = req.params.id;

	if (!id)
		next();

	res.status(200).json(await user_model.get_by_id(id));
};


/* TODO: Add validation */
const signup = async (req, res) => {
	const p = req.body;


	const first_name = p.first_name;
	if (!first_name) {
		const e = err.bad_request("'first_name' is empty!");
		return res.status(e.errno).json(e);
	}

	let last_name = p.last_name;
	if (!last_name)
		last_name = null;

	const username = p.username;
	if (!username) {
		const e = err.bad_request("'username' is empty!");
		return res.status(e.errno).json(e);
	}

	const email = p.email;
	if (!email) {
		const e = err.bad_request("'email' is empty!");
		return res.status(e.errno).json(e);
	}

	const password = p.password;
	if (!password) {
		const e = err.bad_request("'password' is empty!");
		return res.status(e.errno).json(e);
	}

	let h_pass;
	try {
		h_pass = await bcrypt.hash(password, 10);
	} catch (_e) {
		console.error(`controllers.apis.user.signup: ${_e}`);

		const e = err.internal_server_error();
		return res.status(e.errno).json(e);
	}

	const ret = await user_model.signup([
		first_name,
		last_name,
		username,
		email,
		h_pass,
		"e",
		new Date()
	]);

	if (ret.status)
		return res.status(201).json(ret);

	return res.status(ret.errno).json(ret);
};


module.exports = {
	get_all,
	get_by_id,
	signup,
};
