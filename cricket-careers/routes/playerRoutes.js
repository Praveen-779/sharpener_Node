const express = require('express');
const router = express.Router();
const playerController = require('../controller/playerController');

router.post('/add-data', playerController.addData);
router.get('/get-data/:name', playerController.getData);

module.exports = router;