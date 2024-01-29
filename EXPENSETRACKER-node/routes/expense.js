const express = require('express');
const router = express.Router() ;
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

router.post('/add-expense',auth.authenticate,expenseController.addExpense);

router.get('/get-expense',auth.authenticate ,expenseController.getExpenses);

router.delete('/delete/:id', auth.authenticate ,expenseController.deleteExpense);

router.get('/download',auth.authenticate,expenseController.downloadExpense);

router.get('/downloadedexpense',auth.authenticate,expenseController.getDownloadedExpense);



module.exports = router;
