const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

        const response = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(200).json({ response: response });
    } catch (err) {
        res.status(403).json({ err: err });
    }
};

function generateToken(id,ispremiumuser) {
    return jwt.sign({userId : id,ispremiumuser}, 'secretKey');
}

exports.postLogin = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    if( !email || !password) {
        res.status(400).json({error : 'fill in all data'});
    }

    try {
        const user = await User.findAll({where : {email : email}})
        if(user.length === 0) {
           return res.status(404).json({message : 'user not found'});
        }
        
        if(user[0].email === email) {
            const bcryptPassword = await bcrypt.compare(password,user[0].password);
            if(bcryptPassword) {
                res.status(200).json({message : 'user login in successfully',token : generateToken(user[0].id,user[0].ispremiumuser)});
            }
            else {
                res.status(401).json({message : 'password incorrect'});
            }
        } 
    } catch(err) {
        console.log(err);
        res.status(500).json({err : err}) ;
    }
}

exports.getUser = async (req,res,next) => {
    try { 
        const user = await User.findOne({where : {id : req.user.id}});
        res.status(200).json({user : user});
    } catch(err) {
        console.log(err);
        res.status(500).json({error : err});
    }
}