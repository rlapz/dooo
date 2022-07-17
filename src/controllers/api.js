const user_model = require("../models/user");


const get_user = async (req, res) => {
	const id = req.params.id;
	let ret = {
		status: 200,
		rows: 0,
		result: []
	};

	if (id)
		ret.result = await user_model.get_by_id(id);
	else
		ret.result = await user_model.get_all();

	ret.rows = ret.result.length;

	await res.status(ret.status).json(ret);
};


module.exports = {
	get_user,
};
