const jwt = require("jsonwebtoken");

const config = require("../config");
const ApiError = require("../ApiError");


const verify = async (req, _, next) => {
	const {authorization} = req.headers;
	if (!authorization)
		return next(ApiError.forbidden("Invalid authorization"));

	let token = authorization.split(" ");
	if (token.length < 2)
		return next(ApiError.forbidden("Invalid authorization"));

	if (token[0].toLowerCase() != "bearer")
		return next(ApiError.forbidden("Invalid token scheme"));

	token = token[1];
	if (!token)
		return next(ApiError.forbidden("Token is empty"));

	jwt.verify(token, config.server.secret, (err, ret) => {
		if (err) {
			next(ApiError.forbidden("Token is not valid"));
		} else {
			req.auth = ret;
			next();
		}
	});
};


module.exports = {
	verify,
};
