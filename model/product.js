const fs = require('fs');

const readProductFromFile = cb => {
    fs.readFile('message.json',(err,data) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    })
    
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }
    save() {
        readProductFromFile(products => {
            products.push(this);
                fs.writeFile('message.json',JSON.stringify(products),(err) => {
                    if(err) console.log(err);
                })
        })
    }
   static fetchAll(cb) {
        readProductFromFile(cb)
    }
}