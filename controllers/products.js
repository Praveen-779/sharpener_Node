const path = require('path')

exports.getProductController = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
};

exports.postAddProduct = (req,res,next) => {
    console.log(req.body);
    res.redirect('/');
    
};

exports.listProducts = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
}