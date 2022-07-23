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


/* TODO: Add validation */
const sign_up = async (req, res) => {
	let {first_name, last_name, username, email, password} = req.body;


	if (!first_name || (first_name = first_name.trim()).length == 0)
		return err.bad_request(res, "'first_name' is empty!");

	const first_name_len = first_name.length;
	if (first_name_len > 64)
		return err.bad_request(res, "'first_name' is too long, max: 64!");

	if (!last_name)
		last_name = null;

	if (last_name && last_name.length > 64)
		return err.bad_request(res, "'last_name' is too long, max: 64!");

	if (!username || (username = username.trim()).length == 0)
		return err.bad_request(res, "'username' is empty!");

	const username_len = username.length;
	if (username_len > 16)
		return err.bad_request(res, "'username' is too long, max: 16!");

	if (username_len < 3)
		return err.bad_request(res, "'username' is too short, min: 3!");

	if (!email || (email = email.trim()) == 0)
		return err.bad_request(res, "'email' is empty!");

	if (!validator.isEmail(email))
		return err.bad_request(res, "Invalid 'email'!");

	if (!password || (password = password.trim()).length == 0)
		return err.bad_request(res, "'password' is empty!");

	const password_len = password.length;
	if (password_len > 255)
		return err.bad_request(res, "'password' is too long, max: 255!");

	if (password_len < 6)
		return err.bad_request(res, "'password' is too short, min: 6!");


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


const sign_in = async (req, res) => {
	let {username, password} = req.body;


	if (!username || (username = username.trim()).length == 0)
		return err.unauthorized(res, "Username is empty!");

	const username_len = username.length;
	if (username_len > 16)
		return err.unauthorized(res, "Username is too long, max: 16!");

	if (username_len < 3)
		return err.unauthorized(res, "Username is too short, min: 3!");

	if (!password || (password = password.trim()).length == 0)
		return err.unauthorized(res, "Password is empty!");

	const password_len = password.length;
	if (password_len > 255)
		return err.unauthorized(res, "Password is too long, max: 255!");

	if (password_len < 6)
		return err.unauthorized(res, "Password is too short, min: 6!");

	const _res = await user.sign_in(username);
	if (!_res.status)
		return err.unauthorized(res, "Invalid username or password!");

	try {
		const cmp = await bcrypt.compare(password, _res.data[0].password);
		if (!cmp)
			return err.unauthorized(res, "Invalid username or password!");
	} catch (_e) {
		console.error(`controllers.apis.user.sign_in: ${_e}`);

		return err.internal_server_error(res);
	}


	res.status(200).json({
		status: true,
		token: token.get({username})
	});
};


module.exports = {
	get_all,
	get_by_id,
	sign_up,
	sign_in,
};
