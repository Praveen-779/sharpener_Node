// const express = require('express');

// const app = express();

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended:false }));

// app.use('/add-product',(req,res,next) => {
//     res.send('<form action="/products" method="POST" ><input type="text" name="title"></input><button type="submit">send product</button> </form>');
// })
// app.use('/products',(req,res) => {
//     console.log(req.body);
//     res.send(`<h1>your added product was ${req.body}</h1>`);
//     // res.redirect();
// })

// app.listen(7000);



// const express = require('express');

// const app = express();

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended: false}));

// app.use('/add-product',(req,res,next) => {
//     res.send('<form action="/show-product" method="POST" ><input type="text" name="title"></input><button type="submit">send product</button> </form>');
// })

// app.use('/show-product',(req,res) => {
//     console.log(req.body.title);
//     res.redirect();
// })

// app.use('/',(req,res,next) => {
//     res.send(`<h1>hello from node</h1>`);
// })

// app.listen(3000);

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