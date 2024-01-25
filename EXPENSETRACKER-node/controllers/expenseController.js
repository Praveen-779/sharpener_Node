const Expense = require('../models/expense');
let currUser;

exports.addExpense = async (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    try {
        const response = await currUser.createExpense({
            amount : amount,
            description: description,
            category: category
        })
        return res.status(200).json({});
    } catch(err) {
        console.log(err);
    }
}

exports.getExpenses = async (req,res,next) => {
    try {
        currUser = req.user;
        const expenses = await currUser.getExpenses();
        return res.status(200).json({expenses : expenses});
    } catch(err) {
        return res.status(500).json({err}) ;
    }
}

exports.deleteExpense = async (req,res,next) => {
    const id = req.params.id;
    try {
        const expense = await Expense.findAll({where : {id : id, userId : currUser.id}});
        await expense[0].destroy();
        return res.status(200).json({});
    } catch(err) {
        res.status(500).json({err});
        }
}