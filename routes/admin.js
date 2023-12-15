const express = require('express');

const router = express.Router();

router.use('/add-product',(req,res,next) => {
    res.send('<form action="/admin/product" method="POST"><input type="text" name="title"></input><input type="text" name="size"></input><button type="submit">send product</button> </form> ')
});

router.post('/product',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;