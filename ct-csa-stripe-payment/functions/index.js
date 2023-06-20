const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const paymentService = require('./services/paymentService')();
const orderService = require('./services/orderService')();
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

app.get('/cart/:projectKey/:cartId', async(req, res) => {

    const {projectKey,cartId} =req.params;

    const session = await paymentService.createCheckoutSessionForCart({projectKey,cartId});

    if(session){
        res.redirect(303, session.url);
    }else{
        res.status(400).json({Error: "Error"});
    }

    return;
    
} );

app.get('/order/:projectKey/:orderId', async(req, res) => {

    const {projectKey,orderId} =req.params;

    const session = await paymentService.createCheckoutSessionForOrder({projectKey,orderId});

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


app.post('/webhook', async (request, response) => {
    const payload = request.body;

    if(payload.type === 'checkout.session.completed'){

        console.log("Got payload: " ,JSON.stringify (payload));
        const data = payload.data.object;

        const customerDetails = data.customer_details;

        const ret = await paymentService.createPayment(payload.data.object);

        if(ret.cartId){
            const {projectKey} = JSON.parse(payload.data.object.client_reference_id);

            orderService.createOrderFromCart(ret.result.updateCart,projectKey);
        }
        console.log(customerDetails);
    }
  
    response.status(200).end();
  });

exports.stripe_payment = functions.https.onRequest(app);