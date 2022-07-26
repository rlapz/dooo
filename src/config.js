const dotenv = require("dotenv");


dotenv.config();

const env = process.env;
module.exports = {
	server: {
		port: env.PORT || 8000,
		secret: env.SECRET,
		token_expire: env.TOKEN_EXPIRE,
	},
	db: {
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		host: env.DB_HOST,
		database: env.DB_NAME,
		connectionLimit: env.DB_CONNECTION_LIMIT,
	},
};
