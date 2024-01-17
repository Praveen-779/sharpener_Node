const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root','9972798543@Pr',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;