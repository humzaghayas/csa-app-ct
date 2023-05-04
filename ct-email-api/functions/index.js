const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const emailService = require('./services')();
const {adminDBService,graphQLService} =require('ct-external-connections');
const {FETCH_CART_BY_ID} = require('./GraphQL')
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

app.get('/', async(req, res) => {
    
} );

app.post('/send-email', async(req, res) =>{

    const {to,subject,html,orderSummary,cartId,locale,projectKey} = req.body;

    let result ;
    if(!orderSummary){
        result =await emailService.sendEmail({to,subject,html});
    }else{

        const adminConf = await adminDBService.adminConfiguration(projectKey);
        // const locale="en-US";
        const cart = await graphQLService.execute(FETCH_CART_BY_ID,{id:cartId,locale},projectKey);

        console.log('cart',cart);

        const lItems = cart.cart.lineItems.map(l =>{
            return{
                name:l.name,
                quantity:l.quantity,
                price:l.price.value.centAmount/100,
                totalPrice:l.taxedPrice.totalNet.centAmount/100
            }
        });

 
        const priceSummary = {totalNetPrice:cart.cart.taxedPrice.totalNet.centAmount/100};

        const template = "order-email"
        const context ={
            lineItems:lItems,
            priceSummary,
            paymentLink : `${adminConf[projectKey].PAYMENT_LINK}/${projectKey}/${cartId}`
        }

        const html=null;
        result =await emailService.sendEmail({to,subject,html,template,context});
    }
    
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

