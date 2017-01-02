module.exports = function(sequelize, DataTypes) {
	var Unit = sequelize.define("units", {
	    id: {
	        type:DataTypes.INTEGER,
	        autoIncrement: true,
	        primaryKey: true
	    },
	    unit_name: {
	        type: DataTypes.STRING
	    }
	}, {
	    timestamps: false
	});
	return Unit;
}
