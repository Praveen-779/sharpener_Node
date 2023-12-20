const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactusRoutes = require('./routes/contactus');
const successRoutes = require('./routes/success');

const errorController = require('./controllers/error');

const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoutes);

app.use(shopRoutes)

app.use(contactusRoutes);

app.use(successRoutes)

app.use(express.static(path.join(__dirname,'public')));

app.use( errorController.errorPage);

app.listen(3000);
