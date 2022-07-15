const index = async (_, res) => {
	await res.render("root/index", {title: "Home Page"});
};


module.exports = {
	index
};
