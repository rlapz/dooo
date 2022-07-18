const user = require("./apis/user");


const bad_request = async (_, res) => {
	await res.status(400).json({
		status: false,
		errno: 400,
		message: "Bad Request",
	});
};


module.exports = {
	bad_request,
	user,
};
