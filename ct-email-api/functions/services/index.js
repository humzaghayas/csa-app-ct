const {transporter,imapConfig}= require('../config/node-mailer-config')
require('dotenv').config();
const Imap = require('imap');
const {simpleParser} = require('mailparser');

module.exports = ()=>{

    const emailService = {};

    emailService.sendEmail = async()=>{

        try {

            await transporter.sendMail({
                from: "rc.csa.help@gmail.com",//process.env.SMTP_USERNAME,
                to: "rc.csa.help@gmail.com",//process.env.SMTP_USERNAME,
                subject: 'Test Email Subject',
                html: '<h1>Example HTML Message Body</h1>'
            });
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error Sending Email!"}
        }
    };

    emailService.readEmail =async ()=>{
        const imap = new Imap(imapConfig);
        imap.once('ready', () => {
                imap.openBox('INBOX', false, () => {
                    imap.search(['ALL'], (err, results) => {
                        const f = imap.fetch(results, {bodies: ''});
                        f.on('message', msg => {
                            msg.on('body', stream => {
                            simpleParser(stream, async (err, parsed) => {
                                    console.log(parsed);
                                    });
                                });
                            msg.once('attributes', attrs => {
                                const {uid} = attrs;
                                imap.addFlags(uid, ['\\Seen'], () => {
                                    console.log('Marked as read!');
                                });
                            });
                        });
                        f.once('error', ex => {
                            return Promise.reject(ex);
                        });
                        f.once('end', () => {
                            console.log('Done fetching all messages!');
                            imap.end();
                        });
                    });
                });
        });
    }

    return emailService;

}