var nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');

const Forgetpasswordrequest = require('../models/forgotpasswordrequest');
const User = require('../models/user');

const { v4: uuidv4 } = require('uuid');

exports.forgetPasswordmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const uuid = generateUUID();
    const validUser = await updateforgotpassworddb(email,uuid);

    if(validUser) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "bbab1910430@skdc.edu.in",
  
          pass: process.env.MAIL_PASS
        }
      });
      
      const mailOptions = {
        from: 'bbab1910430@skdc.edu.in',
        to: email,
        subject: 'forget password',
        text: `link to update new password http://localhost:7000/password/resetpassword/${uuid}`
      };
  
      const info = await transporter.sendMail(mailOptions)
      return res.status(200).json({ success:true , uuid : uuid});
    }
    else res.status(200).json({success : false});
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }

}

exports.resetpassword = async (req, res, next) => {
  
  try {
    const uuid = req.params.uuid;
    const response = await Forgetpasswordrequest.findOne({ where: { id: uuid } });
    // const isActive = response.isactive;
    if (true) {
      const resetPasswordPagePath = path.join(__dirname, '../', 'views', 'forget-password', 'resetpassword.html');
      console.log('inside isactive');
      res.sendFile(resetPasswordPagePath);
      console.log('success');
    } else {
      res.send('404 Error')
    }
  } catch (err) {
    console.log(err);
  }
}

exports.updatepassword = async (req, res, next) => {
  try {
    console.log('inside update last')
    const email = req.body.email;
    const password = req.body.password;
    console.log(password, email);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await User.update({ password: hashedPassword }, { where: { email: email } });
    await Forgetpasswordrequest.destroy({where :{userId : user.id}});

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



function generateUUID() {
  const uuid = uuidv4();
  console.log('Generated UUID:', uuid);
  
  return uuid;

}

async function updateforgotpassworddb(email, mmid) {
  try {
    console.log(email);
    const user = await User.findOne({ where: { email: email } })
    if(!user) {
      return false;
    }
    await Forgetpasswordrequest.create({ id: mmid, isactive: true, userId: user.id });
    return true;
    
  } catch (err) {
    console.log(err);
    return err;
  }

}

