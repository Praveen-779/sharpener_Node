const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database')
const expenseRoutes = require('./routes/expenseRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ extended: false }));

app.use('/expense',expenseRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(7000);
    })
    .catch(err => console.log(err));




