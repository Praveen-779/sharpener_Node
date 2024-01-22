const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    name : Sequelize.STRING,

    email : {
        type : Sequelize.STRING,
        unique : true
    } ,
    password : Sequelize.STRING
})

module.exports = Expense;