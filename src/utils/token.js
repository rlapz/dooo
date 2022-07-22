const jwt = require("jsonwebtoken");

const config = require("../config");
const err = require("./api_error");


const get = (payload) => {
	return jwt.sign(payload, config.user.token, {expiresIn: "15m"});
};


const verify = async (req, res, next) => {
	const auth = req.headers["authorization"];
	if (!auth)
		return err.forbidden();

	let token = auth.split(" ");
	if (token)
		token = token[1];
	else
		return err.forbidden();

	jwt.verify(token, config.user.token, (_err, _res) => {
		if (_err)
			return err.forbidden("Invalid Token!");

		req.username = _res;
	});

	next();
};


module.exports = {
	get,
	verify
};
