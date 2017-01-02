var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

//creating the recipe model
var Recipe = sequelize.define("recipestable", {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    recipe_name:{
        type: Sequelize.STRING
    },
    recipe_url:{
        type: Sequelize.STRING

    },
    recipe_image:{
        type: Sequelize.STRING

    },
    ingredients:{
        type:Sequelize.STRING
    },
    raw_ingredients:{
        type:Sequelize.STRING
    },
    instructions:{
        type:Sequelize.STRING
    },
    createdAt:{
        type:Sequelize.DATE
    }
}, {
    timestamps: false
});

//sync with db
Recipe.sync();

module.exports = Recipe;
