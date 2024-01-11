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
    static deleteCartById(id,price) {
        fs.readFile(p,(err,filecontent) => {
            if(err) {
                return;
            }
                let updatedProducts = {...JSON.parse(filecontent)};
                console.log(updatedProducts);
            const product = updatedProducts.products.find(prod => prod.id === id);
            if(product) {
                const prodQty = product.qty;
            updatedProducts.products = updatedProducts.products.filter(prod => id !== prod.id);
            updatedProducts.totalPrice = updatedProducts.totalPrice - price * prodQty;
            fs.writeFile(p,JSON.stringify(updatedProducts),(err) => {
                console.log(err);
            }) 
            }
            
        })
    }
    static getProducts(cb) {
        fs.readFile(p,(err,filecontent) => {
            if(err) {
                cb([]);
            } else {
                cb(JSON.parse(filecontent));
            }
        })
    }
}