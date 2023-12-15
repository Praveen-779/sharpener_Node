const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product',(req,res,next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"></input><input type="text" name="size"></input><button type="submit">send product</button> </form> ')
});

app.post('/product',(req,res,next) => {
    console.log(req.body);
    res.end();
})

app.listen(3000);
