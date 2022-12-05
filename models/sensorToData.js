const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const SensorToData = sequelize.define(
    "SensorToData",
    {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
			allowNull: false,
    		unique: true,
			primaryKey: true
        },
        relationID: Sequelize.INTEGER
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false  
    }
);

module.exports = SensorToData;