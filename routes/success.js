const express = require('express');

const router = express.Router();

const successPath = require('../controllers/contact');

router.post('/success',successPath.success);

module.exports = router;