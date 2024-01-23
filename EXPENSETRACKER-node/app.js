const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');


app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/expense',expenseRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(7000);
    })
    .catch(err => console.log(err))  ;