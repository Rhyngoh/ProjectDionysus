var db = require("../models");

module.exports = function(app) {

	app.get("/about", function(req, res) {
		res.render("about");
	});

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

	app.get("/add", function(req,res){
		res.render("add");

	});

	app.get("/list", function(req, res){
		res.render("list");
	});

	app.get("/popular", function(req,res){
		db.Recipe.findAll({
            where:{
                recommendations: {
                   $gt: 0
                }
            },
            order: [['recommendations','DESC']]
        }).then(function(data){
    		res.render("popular", {recipes:data});
        })

	});

	app.get("/:id", function(req,res){
        res.render("recipe", {idnumber: req.params.id});
    });
};
