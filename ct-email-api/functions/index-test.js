const emailService = require('./services')();

(async() =>{
    console.log('Email Service!');
    // await emailService.readEmail();
    await emailService.sendEmail();

    console.log('Email Service!');

})();
