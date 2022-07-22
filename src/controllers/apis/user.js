const user_model = require("../../models/user");


const get_all = async (_, res) => {
	res.status(200).json(await user_model.get_all());
};


const get_by_id = async (req, res, next) => {
	const id = req.params.id;

	if (!id)
		next();

	res.status(200).json(await user_model.get_by_id(id));
};


module.exports = {
	get_all,
	get_by_id,
};
