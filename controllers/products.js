const path = require('path')

const Product = require('../model/product');

exports.getProductController = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
};

exports.postAddProduct = (req,res,next) => {
    
    res.redirect('/');
    
};

exports.listProducts = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
}

exports.redirect = (req,res,next) => {
    const product = new Product(req.body.title);
    product.save();
    Product.fetchAll((products) => {
        console.log(products);
    })
    res.redirect('/');
}