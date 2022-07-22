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

const internal_server_error = (reason) => {
	return _error("Internal Server Error", reason, 500);
}


module.exports = {
	bad_request,
	internal_server_error
};
