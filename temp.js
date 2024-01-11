const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

const products = [{id:'123456',name:'ravi'},{id:'876',name:'praveen'}];
app.get('/',(req,res,next) => {
    res.send('<h1>hell</h1>');
})

app.get('/add-product',(req,res,next) => {
    res.send('<form method="POST" action="/postData" ><input type="text" name="id" ></input><input type="text" name="name"><button type="submit">submit</button> </form>')

})
app.post('/postData',(req,res,next) => {
    const pid = req.body.id;
    const pname = req.body.name;
    products.push({id:pid , name:pname});
    res.send(products);
})

app.get('/:productId',(req,res,next) => {
   const prodId = req.params.productId;
    
    if(prodId === '123') {
        res.send('<h1>123 and inside if</h1>');

    } else {
        res.send(`<h1>${prodId} and inside else</h1>`);
    }
})

app.listen(7000);