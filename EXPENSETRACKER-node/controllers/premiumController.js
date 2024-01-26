const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('sequelize');

exports.getLeaderBoard = async function (req, res, next) {
    try {
        const leaderBoard = await User.findAll({
            attributes: ['id', 'name',[sequelize.fn('sum', sequelize.col('expenses.amount')), "totalCost"]],
            include : [
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group:['id'],
            order:[['totalCost','DESC']]
        });

        res.status(200).json({ leaderBoard: leaderBoard });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}