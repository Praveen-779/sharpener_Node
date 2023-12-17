const express = require('express');

const router = express.Router();

const contactUsRouter = require('../controllers/contact');

router.get('/contactus',contactUsRouter.contactUs);

module.exports = router;