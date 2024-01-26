const Expense = require('../models/expense');

exports.addExpense = async (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    try {
        const response = await req.user.createExpense({
            amount : amount,
            description: description,
            category: category
        })
        const totalExpense = req.user.totalexpense + + amount;
        await req.user.update({totalexpense : totalExpense })
        console.log(totalExpense);
        return res.status(200).json({});
    } catch(err) {
        console.log(err);
    }
}

exports.getExpenses = async (req,res,next) => {
    try {
        const expenses = await req.user.getExpenses();
        return res.status(200).json({expenses : expenses});
    } catch(err) {
        return res.status(500).json({err}) ;
    }
}

exports.deleteExpense =  async (req,res,next) => {
    const id = req.params.id;
    try {
        const expense = await Expense.findOne({where : {id : id, userId : req.user.id}});
        const deletingAmount = expense.amount;
        console.log(expense.amount);
        await expense.destroy();
        console.log(deletingAmount);
        const totalExpense = req.user.totalexpense - deletingAmount;
        await req.user.update({totalexpense : totalExpense});
        return res.status(200).json({});
    } catch(err) {
        console.log(err);
        return res.status(500).json({err});
        }
}