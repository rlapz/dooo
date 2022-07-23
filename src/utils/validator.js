const validator = require("validator");


const is_normal = (str) => {
	return validator.matches(str, "^[a-zA-Z0-9_\.\-]*$");
};


module.exports = {
	is_normal
};
