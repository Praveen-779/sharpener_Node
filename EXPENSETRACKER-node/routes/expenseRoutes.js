const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/signup', expenseController.postExpense);

module.exports = router;
