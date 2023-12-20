const path = require('path');

exports.contactUs = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','contactUs.html'));
};

exports.success = (req,res,next) => {
    res.send(`<h1>Form successfuly filled</h1>`)
 };