const Sequelize = require('sequelize');

const sequelize = new  Sequelize('expense-tracker','root','9972798543@Pr',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;