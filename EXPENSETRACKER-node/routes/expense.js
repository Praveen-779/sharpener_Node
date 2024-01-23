const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/add-expense',expenseController.addExpense);

router.get('/get-expense',expenseController.getExpenses);

router.delete('/delete/:id',expenseController.deleteExpense);

module.exports = router;
