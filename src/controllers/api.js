const user_model = require("../models/user");


const bad_request = async (_, res) => {
	await res.status(400).json({
		status: false,
		errno: 400,
		message: "Bad Request",
	});
};

const get_user = async (req, res) => {
	const id = req.params.id;
	const ret = {
		status: true,
		rows: 0,
		data: [],
	};


	if (id)
		ret.data = await user_model.get_by_id(id);
	else
		ret.data = await user_model.get_all();

	ret.rows = ret.data.length;

	await res.json(ret);
};


module.exports = {
	bad_request,
	get_user,
};
