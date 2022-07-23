const todo = require("../../models/todo");


const get_all = async (_, res) => {
	res.status(200).json(await todo.get_all());
};


const get_by_id = async (req, res, next) => {
	const id = req.params.id;

	if (!id)
		next();

	res.status(200).json(await todo.get_by_id(id));
};


module.exports = {
	get_all,
	get_by_id,
};
