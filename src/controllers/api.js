const test_model = require("../models/test");


const get_test = async (_, res) => {
	await res.json(await test_model.test());
};


module.exports = {
	get_test
};
