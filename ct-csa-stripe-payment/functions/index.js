const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const paymentService = require('./services/paymentService')();
const app = express();


app.use(cors({ origin: true }));

app.get('/:projectKey/:orderId', async(req, res) => {

    const {projectKey,orderId} =req.params;

    const session = await paymentService.createCheckoutSession({projectKey,orderId});

    if(session){
        res.redirect(303, session.url);
    }else{
        res.status(400).json({Error: "Error"});
    }

    return;
    
} );

app.get('/:response', async(req, res) => {

    const {response} =req.params;

    switch (response) {
        case "success":
            res.sendFile(path.join(__dirname, 'public/success.html'));
            break;
        case "cancel":
            res.sendFile(path.join(__dirname, 'public/cancel.html'));
            break;
        default:
            res.status(400).json({Error: "Error"});
            break;
    }
    
    return;
    
} );

exports.stripe_payment = functions.https.onRequest(app);