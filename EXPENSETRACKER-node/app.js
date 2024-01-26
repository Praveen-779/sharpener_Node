const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders')

const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase')
const premiumRoutes = require('./routes/premium');


app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium',premiumRoutes) ;

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
    .sync()
     .then(result => {
        app.listen(7000);
    })
    .catch(err => console.log(err))  ;