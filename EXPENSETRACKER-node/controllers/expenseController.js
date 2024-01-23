const Expense = require('../models/expense');
const bcrypt = require('bcrypt');

exports.postExpense = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!name || !email || !password) {
            return res.status(500).json({ message: 'Fill in all data' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        const response = await Expense.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(200).json({ response: response });
    } catch (err) {
        res.status(403).json({ err: err });
    }
};

exports.postLogin = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password) {
        res.status(400).json({error : 'fill in all data'});
    }

    try {
        const user = await Expense.findAll({where : {email : email}})
        if(user.length === 0) {
           return res.status(404).json({message : 'user not found'});
        }
        
        if(user[0].email === email) {
            const bcryptPassword = await bcrypt.compare(password,user[0].password);
            if(bcryptPassword) {
                res.status(200).json({message : 'user login in successfully'});
            }
            else {
                res.status(401).json({message : 'password incorrect'});
            }
        } 
    } catch(err) {
        console.log(err);
        res.status(500).json({err : err});
    }
    
}