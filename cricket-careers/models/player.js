const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Player = sequelize.define('player', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name : Sequelize.STRING,

    dateofbirth : Sequelize.STRING,

    photourl : Sequelize.STRING,

    birthplace : Sequelize.STRING,

    career: Sequelize.TEXT,

    numberofmatches : Sequelize.STRING,

    score : Sequelize.STRING,

    fifties : Sequelize.STRING,

    centuries : Sequelize.STRING,

    wickets : Sequelize.STRING,

    average : Sequelize.STRING,
})

module.exports = Player;