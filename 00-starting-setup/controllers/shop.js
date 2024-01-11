const Product = require('../models/product');
const cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  cart.getProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for(let product of products) {
        let prod = cart.products.find(p => p.id === product.id);
        if(prod) {
          cartProducts.push({productData : product, qty : prod.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products : cartProducts
      });
    })
  })
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, products => {
    cart.addProduct(prodId,products.price)
  })
  
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.deleteCart = (req,res,next) => {
  const prodId = req.body.productId;
  const prodPrice = req.body.productPrice;
  cart.deleteCartById(prodId,prodPrice);
  res.redirect('/cart');
}
