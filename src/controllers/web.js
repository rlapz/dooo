const index = (_, res) => {
	res.render("home/index", {title: "Home Page"});
};

const sign_in = (_, res) => {
	res.render("signin/index", {title: "Sign In"});
};

const sign_up = (_, res) => {
	res.render("signup/index", {title: "Sign In"});
};

const profile = (_, res) => {
	res.render("profile/index", {title: "Sign In"});
};

const todo = (_, res) => {
	res.render("todo/index", {title: "Sign In"});
};


module.exports = {
	index,
	sign_in,
	sign_up,
	profile,
	todo,
};
