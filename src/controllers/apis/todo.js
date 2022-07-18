const todo_model = require("../../models/todo");


const get = async (req, res) => {
	const id = req.params.id;
	const ret = {
		status: true,
		rows: 0,
		data: [],
	};


	if (id)
		ret.data = await todo_model.get_by_id(id);
	else
		ret.data = await todo_model.get_all();

	ret.rows = ret.data.length;

	await res.json(ret);
};


module.exports = {
	get
};
