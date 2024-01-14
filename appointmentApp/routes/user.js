const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/add-user', userController.addUser);
router.get('/get-users', userController.getUsers);
router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;