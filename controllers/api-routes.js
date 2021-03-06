var db = require("../models");

module.exports = function(app){
    //get all recipes with a specific name
    app.get("/recipe/name/:name", function(req,res){
        db.Recipe.findAll({
            where:{
                recipe_name:{
                    //where the recipe name is contained in another
                    $like: "%"+req.params.name+"%"
                }
            }
        }).then(function(data) {
            res.json(data);
        });
    });
    //get a specific recipe
    app.get("/recipe/id/:id", function(req,res){
        console.log(req.params.id);
        db.Recipe.findOne({
            where:{
                id:req.params.id
            }
        }).then(function(data){
            res.json(data);                

        });
    });
    //get all recipes with an ingredient
    app.get("/recipe/ingredients/:ingredient", function(req,res){
        db.Recipe.findAll({
            where:{
                raw_ingredients:{
                    $like: "%"+req.params.ingredient+"%"
                }
            }
        }).then(function(data) {
            res.json(data);
        });
    });
    //get most popular recipes
    app.get("/recipe/popular", function(req,res){
        db.Recipe.findAll({
            where:{
                recommendations: {
                    //recommendations greater than 0
                    $gt: 0
                }
            },
            order: [['recommendations','DESC']]
        }).then(function(data){
            res.json(data);
        })
    })
    //Add a recipe
    app.post("/recipe/add", function(req,res){
        var ingredients = req.body.ingredients.split(", ");
        db.Recipe.create({
            recipe_name:req.body.title,
            recipe_url: "",
            recipe_image: req.body.image,
            ingredients: ingredients.join(","),
            raw_ingredients: ingredients.join(","),
            instructions:req.body.instructions,
            createdAt: Date.now()
        }).then(function(data){
            res.redirect("/"+data.id);
        });
    });
    //delete a recipe
    app.delete("/recipe/delete/:id", function(req,res){
        db.Recipe.destroy({
            where:{
                id:req.params.id
            }
        });
    });
    //recommend +1 update
    app.put("/recipe/update/recommend/:id", function(req,res){
        console.log("hit the put route");
        console.log(req.body);
        db.Recipe.update({
            recommendations: req.body.recommendations
        },{
            where:{
                id:req.params.id
            }
        });
    });
    //generic update api
    app.put("/recipe/update/:id", function(req,res){
        db.Recipe.update({
            recipe_name:req.body.recipe_name,
            recipe_url: req.body.recipe_url,
            recipe_image: req.body.recipe_image,
            ingredients: req.body.ingredients,
            raw_ingredients: "test",
            recommendations: req.body.recommendations
        },{
            where:{
                id:req.params.id
            }
        });
    });
    //get all recipes
    app.get("/recipe/api/all", function(req,res){
      db.Recipe.findAll({}).then(function(results){
        res.json(results);
      });
    });
    //route for getting all raw ingredients list
    app.get("/ingredients/api/all", function(req,res){
        db.Ingredient.findAll({}).then(function(results) {
          res.json(results);
        });
    });
    //route for getting all units of measurement list
    app.get("/units", function(req,res){
        db.Unit.findAll({}).then(function(results) {
          res.json(results);
        });
    });
};
