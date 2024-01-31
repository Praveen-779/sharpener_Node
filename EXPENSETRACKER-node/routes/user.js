const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.postExpense);

router.post('/login', userController.postLogin);

router.get('/get-user', auth.authenticate, userController.getUser);

module.exports = router;
