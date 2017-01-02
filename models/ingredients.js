var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

//creating the ingredient model
var Ingredient = sequelize.define("rawingredientstable", {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ingredient_name: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

//sync with db
Ingredient.sync();

module.exports = Ingredient;
