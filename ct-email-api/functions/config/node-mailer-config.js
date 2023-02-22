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
    host:"smtp.gmail.com",// process.env.SMTP_MAIL_HOST,
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: 'SSLv3',
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
        user:"rc.csa.help@gmail.com",// process.env.SMTP_USERNAME,
        pass: "supp0rt1",//process.env.SMTP_PASSWORD
    }
});

module.exports ={transporter,imapConfig}