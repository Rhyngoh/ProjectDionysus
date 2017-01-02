module.exports = function(sequelize, DataTypes) {
	//creating the ingredient model
	var Ingredient = sequelize.define("Ingredient", {
	    id: {
	        type:DataTypes.INTEGER,
	        autoIncrement: true,
	        primaryKey: true
	    },
	    ingredient_name: {
	        type: DataTypes.STRING
	    }
	}, {
	    timestamps: false
	});
		return Ingredient;
}
