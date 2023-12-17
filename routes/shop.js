const express = require('express');

const path = require('path');

const router = express.Router();

const listProductsController = require('../controllers/products');

router.get('/',listProductsController.listProducts);

module.exports = router;