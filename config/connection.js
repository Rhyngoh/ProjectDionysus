//connection to sequelize
var Sequelize = require("sequelize");
var sequelize = null;
//create mySQL connection, connect to Jawsdb, else connect to local host
if(process.env.JAWSDB_URL){
	sequelize = new Sequelize(process.env.JAWSDB_URL, {
		dialect:"mysql",
	    pool: {
	      max: 5,
	      min: 0,
	      idle: 10000
	    }
	});
	console.log("Connected to JAWSDB");
}else{
	sequelize = new Sequelize("shoppinglistdb", "root", "root", {
	    host:"localhost",
	    dialect:"mysql",
	    pool: {
	      max: 5,
	      min: 0,
	      idle: 10000
	    }
	});
	console.log("Connected to local host");
}
module.exports = sequelize;
