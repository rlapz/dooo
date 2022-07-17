const user_model = require("../models/user");


const get_user = async (req, res) => {
	const id = req.params.id;
	let ret = {
		status: 200,
		result: null
	};


	try {
		const res = await user_model.select(id);


		if (!res[0])
			throw "No Data";

		ret.result = [];

		for (let {first_name, last_name, username, status} of res) {
			ret.result.push({
				first_name,
				last_name,
				username,
				status,
			});
		}

	} catch (err) {
		ret.status = 404;
		ret.result = err;
	}

	await res.status(ret.status).json(ret);
};


module.exports = {
	get_user,
};
