const User = require('../models/user');

exports.addUser = (req,res,next) => {
   
    const name = req.body.username;
    const number = req.body.phoneNumber;
    const email = req.body.email;
    const data = {name,number,email};
    const user = User.create({name: name, email: email, phonenumber: number })
    .then(result => {
        res.status(200).json({userDetail : result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err})
    })   
}

exports.getUsers = (req,res,next) => {
    User.findAll()
    .then(users => {
        res.status(200).json({userDetail : users});
    })
}

exports.deleteUser = (req,res,next) => {
    const id = req.params.userId;
    User.findByPk(id)
    .then(product => {
        product.destroy();
        res.status(200).json();
    }).catch(err => console.log(err));
}
