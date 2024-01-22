const Expense = require('../models/expense');

exports.postExpense = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!name || !email || !password) {
            return res.status(500).json({ err: 'Fill in all data' });
        }

        const response = await Expense.create({
            name: name,
            email: email,
            password: password
        });

        res.status(200).json({ response: response });
    } catch (err) {
        res.status(403).json({ err: err });
    }
};
