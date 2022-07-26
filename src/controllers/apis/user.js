const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const err = require("../../ApiError");
const user = require("../../models/user");
const config = require("../../config");


const select = async (req, res, next) => {
	const {auth} = req;


	if (!auth || !auth.id)
		return next(err.badRequest("'id' is empty"));

	try {
		res.status(200).json(await user.select(auth.id));
	} catch (e) {
		next(e);
	}
};


const sign_up = async (req, res, next) => {
	let {first_name, last_name, username, email, password} = req.body;


	if (!first_name)
		return next(err.badRequest("'first_name' is empty"));

	if (!username)
		return next(err.badRequest("'username' is empty"));

	if (!email)
		return next(err.badRequest("'email' is empty"));

	if (!password)
		return next(err.badRequest("'password' is empty"));


	if (first_name.length > 64)
		return next(err.badRequest("'first_name' is too long, max: 64"));

	if (!validator.matches(first_name, "^[a-zA-Z0-9]*$"))
		return next(err.badRequest("'first_name' is not valid"));


	last_name ??= "";
	if (last_name.length > 64)
		return next(err.badRequest("'last_name' is too long, max: 64"));

	if (!validator.matches(last_name, "^[a-zA-Z0-9]*$"))
		return next(err.badRequest("'last_name' is not valid"));


	const username_len = username.length;
	if (username_len < 3)
		return next(err.badRequest("'username' is too short, min: 3"));

	if (username_len > 64)
		return next(err.badRequest("'username' is too long, max: 16"));

	if (!validator.matches(username, "^[a-zA-Z0-9]*$"))
		return next(err.badRequest("'username' is not valid"));


	if (!validator.isEmail(email))
		return next(err.badRequest("'email' is not valid"));


	const password_len = password.length;
	if (password_len < 6)
		return next(err.badRequest("'password' is too short, min: 6"));

	if (password_len > 255)
		return next(err.badRequest("'password' is too long, max: 255"));


	try {
		let h_pass = await bcrypt.hash(password, 10);

		await user.sign_up(first_name, last_name, username, email, h_pass);

		res.status(201).json({message: "Success"});
	} catch (e) {
		if (e.errno == 1062)
			e = err.badRequest(e.text);

		next(e);
	}
};


const sign_in = async (req, res, next) => {
	let {username, password} = req.body;


	if (!username)
		return next(err.unauthorized("'username' is empty"));

	if (!password)
		return next(err.unauthorized("'password' is empty"));


	const username_len = username.length;
	if (username_len < 3)
		return next(err.unauthorized("'username' is too short, min: 3"));

	if (username_len > 16)
		return next(err.unauthorized("'username' is too long, max: 16"));

	if (!validator.matches(username, "^[a-zA-Z0-9]*$"))
		return next(err.unauthorized("'username' is not valid"));


	const password_len = password.length;
	if (password_len < 6)
		return next(err.unauthorized("'password' is too short, min: 6"));

	if (password_len > 255)
		return next(err.unauthorized("'password' is too long, max: 255"));


	try {
		const ret = await user.sign_in(username);

		if (!await bcrypt.compare(password, ret.password)) {
			throw err.unauthorized(
				"Wrong 'username' or 'password'"
			);
		}

		const token = jwt.sign(
			{id: ret.id, username: ret.username},
			config.server.secret,
			{expiresIn: config.server.token_expire},
		);

		res.status(200).json({token});
	} catch (e) {
		return next(e);
	}
};


const remove = async (req, res, next) => {
	const {auth} = req;


	if (!auth || !auth.id)
		return next(err.badRequest("'id' is empty"));

	try {
		await user.remove(auth.id);
		res.status(200).json({message: "Success"});
	} catch (e) {
		next(e);
	}
};


const update = async (req, res, next) => {
	let {first_name, last_name, username, email, password} = req.body;
	const {auth} = req;


	if (!auth || !auth.id)
		return next(err.badRequest("'id' is empty"));

	if (first_name) {
		if (first_name.length > 64)
			return next(err.badRequest("'first_name' is too long, max: 64"));

		if (!validator.matches(first_name, "^[a-zA-Z0-9]*$"))
			return next(err.badRequest("'first_name' is not valid"));
	}

	if (last_name !== undefined) {
		last_name ??= "";

		if (last_name.length > 64)
			return next(err.badRequest("'last_name' is too long, max: 64"));

		if (!validator.matches(last_name, "^[a-zA-Z0-9]*$"))
			return next(err.badRequest("'last_name' is not valid"));
	}

	if (username) {
		const username_len = username.length;
		if (username_len < 3)
			return next(err.badRequest("'username' is too short, min: 3"));

		if (username_len > 16)
			return next(err.badRequest("'username' is too long, max: 16"));

		if (!validator.matches(username, "^[a-zA-Z0-9]*$"))
			return next(err.badRequest("'username' is not valid"));
	}

	if (email && !validator.isEmail(email))
		return next(err.badRequest("'email' is not valid"));

	if (password) {
		const password_len = password.length;
		if (password_len < 6)
			return next(err.badRequest("'password' is too short, min: 6"));

		if (password_len > 255)
			return next(err.badRequest("'password' is too long, max: 255"));
	}


	try {
		let h_pass;

		if (password)
			h_pass = await bcrypt.hash(password, 10);

		await user.update(
			auth.id,
			first_name,
			last_name,
			username,
			email,
			h_pass
		);

		res.status(200).json({message: "Success"});
	} catch (e) {
		if (e.errno == 1062)
			e = err.badRequest(e.text);

		next(e);
	}
};


module.exports = {
	select,
	sign_up,
	sign_in,
	remove,
	update,
};
