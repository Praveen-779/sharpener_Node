const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const contactusRoutes = require('./routes/contactUs.js')
const successRoutes = require('./routes/success.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin' ,adminRoutes);
app.use('/',shopRoutes);
app.use('/',contactusRoutes);
app.use('/',successRoutes);

app.use((req,res,next)=> {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.listen(3000);
