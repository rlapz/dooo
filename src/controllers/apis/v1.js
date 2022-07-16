const db = require("../../db/mariadb");


/* Test */
module.exports = async (_, res) => {
	let row;

	try {
		row = await db.pool.query("SELECT NOW() AS NOW");
	} catch (err) {
		await res.json({status: false, msg: `${err}`});
		console.error(err);
		return;
	}

	await res.json({status: true, now: row[0].NOW});
};

