class ApiError {
	constructor(errno, message) {
		this.errno = errno;
		this.message = message;
	}

	static badRequest(message) {
		if (!message)
			message = "Bad Request";

		return new ApiError(400, message);
	}

	static unauthorized(message) {
		if (!message)
			message = "Unauthorized";

		return new ApiError(401, message);
	}

	static forbidden(message) {
		if (!message)
			message = "Forbidden";

		return new ApiError(403, message);
	}

	static internalServerError(message) {
		if (!message)
			message = "Internal Server Error";

		return new ApiError(500, message);
	}
};


module.exports = ApiError;
