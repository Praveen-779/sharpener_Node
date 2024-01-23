const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const app = express();

const expenseRoutes = require('./routes/expenseRoutes');

app.use(cors());
app.use(express.json());

app.use('/user', expenseRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(7000);
    })
    .catch(err => console.log(err)) ;