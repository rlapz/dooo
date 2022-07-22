const _error = (res, message, reason, errno) => {
	if (reason)
		message = `${message}: ${reason}`;


	const ret = {
		status: false,
		errno,
		message
	};


	if (res)
		return res.status(errno).json(ret);

	return ret;
};


const bad_request = (res, reason) => {
	return _error(res, "Bad Request", reason, 400);
};


const unauthorized = (res, reason) => {
	return _error(res, "Unauthorized", reason, 401);
};


const forbidden = (res, reason) => {
	return _error(res, "Forbidden", reason, 403);
};


const internal_server_error = (res, reason) => {
	return _error(res, "Internal Server Error", reason, 500);
}


module.exports = {
	bad_request,
	unauthorized,
	forbidden,
	internal_server_error
};
