module.exports = function(app) {

	app.get("/", function(req, res) {
		res.render("home");
	});

	app.get("/browse", function(req,res){
		res.render("browse");

	});

};
