//connection to sequelize
var Sequelize = require("sequelize");

//create mySQL connection
var sequelize = new Sequelize("shoppinglistdb", "root", "root", {
  host:"localhost",
  dialect:"mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;