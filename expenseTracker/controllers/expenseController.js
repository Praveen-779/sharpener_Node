const Expense = require('../models/expense');

exports.addExpense = (req, res, next) => {
    const date = req.body.date;
    const description = req.body.description;
    const amount = req.body.amount;
    const expense = Expense.create({ description: description, amount: amount, date: date })
        .then(response => {
            res.status(200).json();
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


exports.getExpenses = (req, res, next) => {
    Expense.findAll()
        .then(response => {
            res.status(200).json({ expense: response });
        }).catch(err => console.log(err));
}


exports.getExpense = (req, res, next) => {
    const id = req.params.id;
    Expense.findByPk(id)
        .then(expense =>
            res.status(200).json({ expense: expense }))
        .catch(err => console.log(err));
}


exports.deleteExpense = (req, res, next) => {
    const id = req.params.id;
    Expense.findByPk(id)
        .then(expense => {
            expense.destroy();
            res.status(200).json();
        }).catch(err => console.log(err));
}