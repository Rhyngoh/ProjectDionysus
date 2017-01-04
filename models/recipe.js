module.exports = function(sequelize, DataTypes) {
    //creating the recipe model
    var Recipe = sequelize.define("Recipe", {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        recipe_name:{
            type: DataTypes.STRING
        },
        recipe_url:{
            type: DataTypes.STRING

        },
        recipe_image:{
            type: DataTypes.STRING

        },
        ingredients:{
            type:DataTypes.STRING
        },
        raw_ingredients:{
            type:DataTypes.STRING
        },
        instructions:{
            type:DataTypes.STRING
        },
        createdAt:{
            type:DataTypes.DATE
        },
        recommendations:{
            type:DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
        return Recipe;
}