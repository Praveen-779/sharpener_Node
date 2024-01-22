const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database')
const Expense = require('./models/expense');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/user/signup',async (req,res,next ) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const response = await Expense.create(
            {
                name : name,
                email : email,
                password : password
            })
            res.status(200).json({response : response});
    } catch(err) {
        res.status(403).json({err : err})
    }

    
})

sequelize
    .sync()
    .then(result => {
        app.listen(7000);
    })
    .catch(err => console.log(err));




