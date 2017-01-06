var db = require("../models");

module.exports = function(app) {
	//render the about page
	app.get("/about", function(req, res) {
		res.render("about");
	});
	//render the home(default page)
	app.get("/", function(req,res){
		//Queries DB for 15 random recipes
		db.Recipe.findAll({
			limit: 15,
			order: [
				db.Recipe.sequelize.fn('RAND')
			]
		}).then(function(data) {
			res.render("browse", {recipes: data});
		});
	});
	//render the add page
	app.get("/add", function(req,res){
		res.render("add");
	});
	//render the list page
	app.get("/list", function(req, res){
		res.render("list");
	});
	//render the popular page
	app.get("/popular", function(req,res){
		db.Recipe.findAll({
            where:{
            	//find all where recommendations > 0
                recommendations: {
                   $gt: 0
                }
            },
            order: [['recommendations','DESC']]
        }).then(function(data){
    		res.render("popular", {recipes:data});
        });
	});
	//render a recipe page, specific for id
	app.get("/:id", function(req,res){
        res.render("recipe", {idnumber: req.params.id});
    });
};
