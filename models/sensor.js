const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const Sensor = sequelize.define(
	"sensor",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
    		unique: true,
			primaryKey: true
		},
		sensor_type: Sequelize.STRING(50)		         
	},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false  
    }
);

module.exports = Sensor;