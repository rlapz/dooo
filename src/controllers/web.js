const index = (_, res) => {
	res.render("home/index", {title: "Home Page"});
};

const sign_in = (_, res) => {
	res.render("signin/index", {title: "Sign In"});
};

const sign_up = (_, res) => {
	res.render("signup/index", {title: "Sign Up"});
};

const profile = (_, res) => {
	res.render("profile/index", {title: "Profile"});
};

const todo = (_, res) => {
	res.render("todo/index", {title: "To Do"});
};

const not_found = (_, res) => {
	res.render("404", {title: "404 Not Found!"});
};


module.exports = {
	index,
	sign_in,
	sign_up,
	profile,
	todo,
	not_found,
};
