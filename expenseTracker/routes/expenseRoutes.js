const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/add-expense',expenseController.addExpense);
router.get('/get-expenses',expenseController.getExpenses);
router.get('/get-expense/:id',expenseController.getExpense);
router.delete('/delete-expense/:id',expenseController.deleteExpense);

module.exports = router;