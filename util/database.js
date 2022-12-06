require('dotenv').config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER_NAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    timezone: '+08:00',
    dialectOptions: {
      // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true
    }
  });

  

  module.exports = sequelize;