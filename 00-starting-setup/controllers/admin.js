const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prodId = req.body.productId;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();

  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  if(!editMode) {
    return res.redirect('/');
  }
  Product.findById( prodId, product => {
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product : product
    });
  })
  
};

exports.postEditProduct = (req,res,next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageurl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const updatedProducts = new Product(
    prodId,
    updatedTitle,
    updatedImageurl,
    updatedDescription,
    updatedPrice
    )
    updatedProducts.save();
    res.redirect('/admin/products');
}

exports.deleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  Product.deleteProductbyId(prodId);
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};