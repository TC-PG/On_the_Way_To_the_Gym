const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const User = sequelize.define(
	"user",
	{
		user_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
    		unique: true,
			primaryKey: true
		},
		name: Sequelize.STRING(50),
		password: Sequelize.STRING(100),
		level: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		age:{
			type: Sequelize.INTEGER,
			defaultValue: 20
		},            
	},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false  
    }
);

module.exports = User;