const express = require('express');

const router = express.Router();

const path = require('path');

const addProductController = require('../controllers/products');

router.use('/add-product',addProductController.getProductController);

router.post('/product',addProductController.postAddProduct);

module.exports = router