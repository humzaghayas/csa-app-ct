const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const emailService = require('./services')();
const {getTicketCategories,getTicketPriorityValues} = require('ct-tickets-helper-api');


const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

app.get('/', async(req, res) => {
    
} );

app.post('/send-email', async(req, res) =>{

    const {to,subject,html} = req.body;
    const result =await emailService.sendEmail({to,subject,html});
    
    if(result.code === 'error'){
        res.status(400).json({result: result.message});    
    }else{
        res.status(200).json(result);
    }

});

app.get('/emails', async(req, res) =>{

    await emailService.readEmail();
});

exports.emailer = functions.https.onRequest(app);

