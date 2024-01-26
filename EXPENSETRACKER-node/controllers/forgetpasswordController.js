var nodemailer = require('nodemailer');
require('dotenv').config();

exports.forgetPassword = async (req,res,next) => {
  try {
     const email = req.body.email;
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
        text: 'mail regarding you forget password!'
      };
      
      const info = await transporter.sendMail(mailOptions)
      res.status(200).json({info:info})
  } catch(err) {
    console.log(err);
    res.status(500).json({err : err});
  }
 
}

