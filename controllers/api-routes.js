var Recipe = require("../models/recipe.js");

module.exports = function(app){

    //get a specific recipe
    app.get("/recipe/id/:id", function(req,res){
        Recipe.findOne({
            where:{
                id:req.params.id
            }
        }).then(function(data){
            res.json(data);
        });
    });

    //get all recipes with an ingredient
    app.get("/recipe/ingredients/:ingredient", function(req,res){
        Recipe.findAll({
            where:{
                raw_ingredients:{
                    $like: "%"+req.params.ingredient
                }
            }
        });
    });

    app.post("/recipe/add", function(req,res){
        Recipe.create({
            recipe_name:req.body.recipe_name,
            recipe_url: null,
            recipe_image: req.body.recipe_image,
            ingredients: req.body.ingredients,
            //figure out how to get the raw ingredients to work here
            raw_ingredients: "test",
            createdAt: Date.now()
        });
    });

    //delete a recipe
    app.delete("/recipe/delete/:id", function(req,res){
        Recipe.destroy({
            where:{
                id:req.params.id
            }
        });
    });

    app.update("/recipe/update/:id", function(req,res){
        Recipe.update({
            recipe_name:req.body.recipe_name,
            recipe_url: req.body.recipe_url,
            recipe_image: req.body.recipe_image,
            ingredients: req.body.ingredients,
            //figure out how to get the raw ingredients to work here
            raw_ingredients: "test",
        },{
            where:{
                id:req.params.id
            }
        });
    });
};