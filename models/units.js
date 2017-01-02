var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

//creating the unit model
var Unit = sequelize.define("unitstable", {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    unit_name: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

//sync with db
Unit.sync();

module.exports = Unit;