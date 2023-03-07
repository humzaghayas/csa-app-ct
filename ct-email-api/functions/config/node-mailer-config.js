const nodemailer = require('nodemailer');
require('dotenv').config();

const imapConfig = {
  user: "rc.csa.help@gmail.com",//process.env.SMTP_USERNAME,
  password: "supp0rt1",//process.env.SMTP_PASSWORD,
  host: "imap.gmail.com",// process.env.IMAP_MAIL_HOST,
  port: 993,
  tls: true,
};


let transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,// process.env.SMTP_MAIL_HOST,
    port: process.env.EMAIL_PORT,
    debug: true,
    auth: {
        user:process.env.EMAIL_USERNAME,// process.env.SMTP_USERNAME,
        pass:process.env.EMAIL_PASSWORD,//process.env.SMTP_PASSWORD
    }
});

module.exports ={transporter,imapConfig}