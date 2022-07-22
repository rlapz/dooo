const jwt = require("jsonwebtoken");

const config = require("../config");
const err = require("./api_error");


const get = (payload) => {
	return jwt.sign(payload, config.user.token, {expiresIn: "15m"});
};


const verify = async (req, res, next) => {
	const auth = req.headers["authorization"];
	if (!auth) {
		const e = err.forbidden();
		res.status(e.errno).json(e);
	}

	let token = auth.split(" ");
	if (token) {
		token = token[1];
	} else {
		const e = err.forbidden();
		res.status(e.errno).json(e);
	}

	jwt.verify(token, config.user.token, (_err, _res) => {
		if (_err) {
			const e = err.forbidden("Invalid Token!");
			return res.status(e.errno).json(e);
		}

		req.username = _res;
	});

	next();
};


module.exports = {
	get,
	verify
};
