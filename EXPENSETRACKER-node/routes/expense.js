const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

router.post('/add-expense',auth.authenticate,expenseController.addExpense);

router.get('/get-expense',auth.authenticate ,expenseController.getExpenses);

router.delete('/delete/:id',auth.authenticate ,expenseController.deleteExpense);

module.exports = router;
