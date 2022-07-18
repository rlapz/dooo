const index = (_, res) => {
	res.render("home/index", {title: "Home Page"});
};


module.exports = {
	index
};
