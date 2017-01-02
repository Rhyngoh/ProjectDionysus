
var db = require("../models")


module.exports = function(app){

    //get a specific recipe
    app.get("/recipe/id/:id", function(req,res){
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

    app.post("/recipe/add", function(req,res){
        db.Recipe.create({
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
        db.Recipe.destroy({
            where:{
                id:req.params.id
            }
        });
    });

    app.put("/recipe/update/:id", function(req,res){
        db.Recipe.update({
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

    //route for getting raw ingredients list
    app.get("/ingredients", function(req,res){
        db.Ingredient.findAll({});
    })

    //route for getting list of units of measurement
    app.get("/units", function(req,res){
        db.Unit.findAll({});
    })



};
