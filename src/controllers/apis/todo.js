const todo = require("../../models/todo");


const get = async (req, res) => {
	const {id} = req.body;
	let ret;


	if (id)
		ret = await todo.get_by_id(id);
	else
		ret = await todo.get_all();

	if (ret.status)
		return res.status(200).json(ret);

	return res.status(ret.errno).json(ret);
};


module.exports = {
	get,
};
