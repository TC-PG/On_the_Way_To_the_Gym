const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Sensor_data = sequelize.define(
    "sensor_data",
    {
        sensor_data_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
			allowNull: false,
    		unique: true,
			primaryKey: true
        },
        instant: {
            type: "TIMESTAMP"
        },
        x_axis: Sequelize.DOUBLE,
        y_axis: Sequelize.DOUBLE,
        z_axis: Sequelize.DOUBLE       
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false 
    }
);

module.exports = Sensor_data;