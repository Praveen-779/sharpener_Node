const http = require('http');

const bodyParser = require('body-parser');

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product',(req,res,next)=> {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"> <button type="submit">ADD PRODUCT</button> </form>');
});

app.use('/product',(req,res,next)=> {
    console.log(req.body);
    res.redirect('/');
})
app.use('/',(req,res,next)=> {
    res.send('<h1>hello from express</h1>');
});

app.listen(3000)
