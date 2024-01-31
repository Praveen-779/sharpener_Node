const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Forgetpasswordrequest = sequelize.define('forgotpasswordrequest', {
    id: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },

    isactive: Sequelize.BOOLEAN
})

module.exports = Forgetpasswordrequest;