const fs = require('fs');
const path = require('path');
const cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id) {
        const updatedProductIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products];
        updatedProducts[updatedProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }
      else{
        this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      })}
    });
  }

  static deleteProductbyId(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const price = product.price;
      let deleteProduct = [];
      deleteProduct = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(deleteProduct), err => {
        cart.deleteCartById(id,price);
      })
    })
    
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
