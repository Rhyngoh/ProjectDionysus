var db = require("../models");

module.exports = function(app) {

	app.get("/", function(req, res) {
		res.render("home");
	});

	app.get("/browse", function(req,res){
		//Query DB for first 5 recipes, this is mostly a placeholder query until we have something real to query for (eg. most popular recipes)
		db.Recipe.findAll({
			where: {
				id: {
					$gt: 0
				},
				id: {
					$lte: 15
				}
			}
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
