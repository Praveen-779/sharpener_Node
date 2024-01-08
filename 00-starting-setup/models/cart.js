const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct (id,price) {
        //fetch previous cart
        fs.readFile(p,(err,data) => {
            let cart = {products: [], totalPrice : 0};
            if(!err) {
                cart = JSON.parse(data);
            }
            //find existing product
            const existingProduct = cart.products.find(product => id === product.id);
            const existingProductIndex = cart.products.findIndex(products => id === products.id);
            let updatedProduct;

            //add new product/increase qty.
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id : id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + + price;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if(err) console.log(err);
            })
        })
    }
}