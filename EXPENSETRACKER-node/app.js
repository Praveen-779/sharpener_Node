const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders')
const Forgotpasswordrequest = require('./models/forgotpasswordrequest');

const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase')
const premiumRoutes = require('./routes/premium');
const forgetpasswordRoutes = require('./routes/forgetpassword');
const Forgetpasswordrequest = require('./models/forgotpasswordrequest');


app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password',forgetpasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpasswordrequest);
Forgetpasswordrequest.belongsTo(User);

sequelize
    .sync()
    .then(result => {
        app.listen(7000);
    })
    .catch(err => console.log(err));