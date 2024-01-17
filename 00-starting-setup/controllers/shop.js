const Product = require('../models/product');
const cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  //   
  //   Product.findAll({where: {id: prodId}})
  //   .then((prod) => {
  //     res.render('shop/product-detail', {
  //       product: prod[0],
  //       pageTitle: prod[0].title,
  //       path: '/products'
  //     });
  //   }).catch(err => console.log(err));
  // };
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((prod) => {
      res.render('shop/product-detail', {
        product: prod,
        pageTitle: prod.title,
        path: '/products'
      });
    }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
    })
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let retrievedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      console.log(cart);
      retrievedCart = cart;
      cart.getProducts({ where: { id: prodId } })
        .then(products => {
          let product;
          if (products.length > 0) {
            product = products[0];
          }

          if (product) {
            newQuantity = product.cartItem.quantity + 1;
            return product;
          }

          return Product.findByPk(prodId)
        })

        .then(product => {
          return retrievedCart.addProduct(product,
            { through: { quantity: newQuantity } })
        })
        .then(result => {
          res.redirect('/cart');
        })
        .catch(err => console.log(err));
    })
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

exports.deleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0];
      console.log(product);
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    }).catch(err => console.log(err));

}
