const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoutes);

app.use('/shop',shopRoutes);

app.use( (req,res,next) => {
    res.status(404).send('page not found');
})

app.listen(3000);
