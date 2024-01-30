const Sequelize = require('sequelize');

const sequelize = new  Sequelize('expense-tracker',process.env.DB_PORT,process.env.DB_PASSWORD,{
    dialect: 'mysql',    
    host: 'localhost'
});

module.exports = sequelize;