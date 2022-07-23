const bcrypt = require("bcrypt");
const validator = require("validator");

const user = require("../../models/user");
const err = require("../../utils/api_error");
const token = require("../../utils/token");


const get_all = async (_, res) => {
	res.status(200).json(await user.get());
};


const get_by_id = async (req, res, next) => {
	const {id} = req.params;


	if (!id)
		next();

	res.status(200).json(await user.get({id}));
};


// TODO: Sanitize user input
const sign_up = async (req, res) => {
	let {first_name, last_name, username, email, password} = req.body;


	first_name ??= "";
	last_name ??= "";
	username ??= "";
	email ??= "";
	password ??= "";


	const first_name_len = first_name.length;
	if (validator.contains(first_name, " "))
		return err.bad_request(res, "'first_name' should not contains whitespace.");

	if (first_name_len == 0)
		return err.bad_request(res, "'first_name' is empty.");

	if (first_name_len < 1)
		return err.bad_request(res, "'first_name' is too short, min: 1.");

	if (first_name_len > 64)
		return err.bad_request(res, "'first_name' is too long, max: 64.");


	const last_name_len = last_name.length;
	if (last_name_len > 64)
		return err.bad_request(res, "'last_name' is too long, max: 64.");

	if (validator.contains(last_name, " "))
		return err.bad_request(res, "'last_name' should not contains whitespace.");

	if (last_name_len == 0)
		last_name = null; // last_name is optional


	const username_len = username.length;
	if (validator.contains(username, " "))
		return err.bad_request(res, "'username' should not contains whitespace.");

	if (username_len == 0)
		return err.bad_request(res, "'username' is empty.");

	if (username_len < 3)
		return err.bad_request(res, "'username' is too short, min: 3.");

	if (username_len > 16)
		return err.bad_request(res, "'username' is too long, max: 16.");


	if (!validator.isEmail(email))
		return err.bad_request(res, "Invalid 'email' address.");


	const password_len = password.length;
	if (password_len == 0)
		return err.bad_request(res, "'password' is empty.");

	if (password_len < 6)
		return err.bad_request(res, "'password' is too short, min: 6.");

	if (password_len > 255)
		return err.bad_request(res, "'password' is too long, max: 255.");


	let h_pass;
	try {
		h_pass = await bcrypt.hash(password, 10);
	} catch (_e) {
		console.error(`controllers.apis.user.sign_up: ${_e}`);

		return err.internal_server_error(res);
	}

	const ret = await user.sign_up([
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


// TODO: Sanitize user input
const sign_in = async (req, res) => {
	let {username, password} = req.body;


	username ??= "";
	password ??= "";


	const username_len = username.length;
	if (validator.contains(username, " "))
		return err.unauthorized(res, "'username' should not contains whitespace.");

	if (username_len == 0)
		return err.unauthorized(res, "'username' is empty.");

	if (username_len < 3)
		return err.unauthorized(res, "'username' is too short, min: 3.");

	if (username_len > 16)
		return err.unauthorized(res, "'username' is too long, max: 16.");


	const password_len = password.length;
	if (password_len == 0)
		return err.unauthorized(res, "'password' is empty.");

	if (password_len < 6)
		return err.unauthorized(res, "'password' is too short, min: 6.");

	if (password_len > 255)
		return err.unauthorized(res, "'password' is too long, max: 255.");


	const _res = await user.sign_in(username);
	if (!_res.status)
		return res.status(_res.errno).json(_res);


	const _pass = _res.data[0].password;
	const _email = _res.data[0].email;
	try {
		const cmp = await bcrypt.compare(password, _pass);
		if (!cmp)
			return err.unauthorized(res, "Invalid 'username' or 'password'.");
	} catch (_e) {
		console.error(`controllers.apis.user.sign_in: ${_e}`);
		return err.internal_server_error(res);
	}


	res.status(200).json({
		status: true,
		token: token.get({username, email: _email})
	});
};


module.exports = {
	get_all,
	get_by_id,
	sign_up,
	sign_in,
};
