const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const DownloadedExpense = sequelize.define('downloadedexpense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    date: Sequelize.STRING,
    url: Sequelize.STRING
})

module.exports = DownloadedExpense;