const index = async (_, res) => {
	await res.render("home/index", {title: "Home Page"});
};


module.exports = {
	index
};
