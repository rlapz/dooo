const user = require("./apis/user");
const todo = require("./apis/todo");


const bad_request = (_, res) => {
	res.status(400).json({
		status: false,
		errno: 400,
		message: "Bad Request",
	});
};


module.exports = {
	bad_request,
	user,
	todo
};
