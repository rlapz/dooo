const db = require("../db/mariadb");


/* Test */
const test = async () => {
	let row;
	let ret;

	try {
		row = await db.pool.query("SELECT NOW() AS NOW");
		ret = {
			status: true,
			result: row[0].NOW
		};
	} catch (err) {
		ret = {
			status: false,
			result: err
		};
		console.error(err);
	}

	return ret;
};


module.exports = {
	test,
};
