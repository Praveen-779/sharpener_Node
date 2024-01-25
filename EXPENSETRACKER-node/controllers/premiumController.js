const User = require('../models/user');
const Expense = require('../models/expense');

exports.getLeaderBoard = async function (req, res, next) {
    try {
        const expenses = await Expense.findAll();
        const users = await User.findAll();

        const aggregatedExpense = {};

        expenses.forEach(expense => {
            if (aggregatedExpense[expense.userId]) {
                aggregatedExpense[expense.userId] += expense.amount;
            } else {
                aggregatedExpense[expense.userId] = expense.amount;
            }
        })
        const leaderBoardArray = [];
        users.forEach(user => {
            leaderBoardArray.push({ name: user.name, totalCost: aggregatedExpense[user.id] });
        })
        leaderBoardArray.sort((a,b) => b.totalCost - a.totalCost );
        res.status(200).json({ leaderBoard: leaderBoardArray });
    } catch(err) {
        res.status(500).json({err : err});
    }
}