const express = require('express');
const router = express.Router();
const forgetpasswordController = require('../controllers/forgetpasswordController');

router.post('/forgetpassword',forgetpasswordController.forgetPassword)

module.exports = router ;