const _error = (message, reason, errno) => {
	if (reason)
		message = `${message}: ${reason}`;


	return {
		status: false,
		errno,
		message
	}
};


const bad_request = (reason) => {
	return _error("Bad Request", reason, 400);
};


const unauthorized = (reason) => {
	return _error("Unauthorized", reason, 401);
};


const forbidden = (reason) => {
	return _error("Forbidden", reason, 403);
};


const internal_server_error = (reason) => {
	return _error("Internal Server Error", reason, 500);
}


module.exports = {
	bad_request,
	unauthorized,
	forbidden,
	internal_server_error
};
