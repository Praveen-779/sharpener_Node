const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name : Sequelize.STRING,

    email : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false
    } ,
    password : Sequelize.STRING
})

module.exports = Expense;