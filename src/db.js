const db = require("mariadb");

const config = require("./config");


module.exports = db.createPool(config.db);
