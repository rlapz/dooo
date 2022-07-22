const bcrypt = require("bcrypt");

const user_model = require("../../models/user");
const err = require("../../utils/api_error");
const token = require("../../utils/token");


const get_all = async (_, res) => {
	res.status(200).json(await user_model.get());
};


const get_by_id = async (req, res, next) => {
	const {id} = req.params;


	if (!id)
		next();

	res.status(200).json(await user_model.get({id}));
};


/* TODO: Add validation */
const sign_up = async (req, res) => {
	let {first_name, last_name, username, email, password} = req.body;


	if (!first_name)
		return err.bad_request(res, "'first_name' is empty!");

	if (!last_name)
		last_name = null;

	if (!username)
		return err.bad_request(res, "'username' is empty!");

	if (!email)
		return err.bad_request(res, "'email' is empty!");

	if (!password)
		return err.bad_request(res, "'password' is empty!");

	let h_pass;
	try {
		h_pass = await bcrypt.hash(password, 10);
	} catch (_e) {
		console.error(`controllers.apis.user.sign_up: ${_e}`);

		return err.internal_server_error(res);
	}

	const ret = await user_model.sign_up([
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

	if (!username)
		return err.unauthorized(res, "Username is empty!");

	username = username.trim();

	if (!password)
		return err.unauthorized(res, "Password is empty!");

	const _res = await user_model.sign_in(username);
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
