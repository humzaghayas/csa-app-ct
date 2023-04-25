const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const emailService = require('./services/emailService')();
const { CONSTANTS } = require('./config/Constants');
const customerService = require('./services/customerService')();
const orderService = require('./services/orderService')();


exports.orderSbscription = functions.pubsub.topic('csa-order-topic').onPublish(
// exports.orderSbscription = functions.https.onRequest(
    async(message, context) => {
        console.log('humza at ', context.timestamp);

        // Decode the PubSub Message body.
        let messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;

        // const data = "eyJub3RpZmljYXRpb25UeXBlIjoiTWVzc2FnZSIsInByb2plY3RLZXkiOiJjc2EtcHJvamVjdC0zIiwiaWQiOiJkZThiOGQ4Ny00MGQyLTRiOWMtYjQxYi1iZjYwNWJiZjE0MGIiLCJ2ZXJzaW9uIjoxLCJzZXF1ZW5jZU51bWJlciI6MywicmVzb3VyY2UiOnsidHlwZUlkIjoib3JkZXIiLCJpZCI6ImY5ZWYwNmYxLTQxOTktNDVlMS04ZWNiLWM3YWY0YmVmZDUxYSJ9LCJyZXNvdXJjZVZlcnNpb24iOjMsInR5cGUiOiJPcmRlclN0YXRlQ2hhbmdlZCIsIm9yZGVySWQiOiJmOWVmMDZmMS00MTk5LTQ1ZTEtOGVjYi1jN2FmNGJlZmQ1MWEiLCJvcmRlclN0YXRlIjoiQ29uZmlybWVkIiwib2xkT3JkZXJTdGF0ZSI6Ik9wZW4iLCJjcmVhdGVkQXQiOiIyMDIzLTA0LTE0VDE3OjQwOjEzLjA1OFoiLCJsYXN0TW9kaWZpZWRBdCI6IjIwMjMtMDQtMTRUMTc6NDA6MTMuMDU4WiJ9";

        // let messageBody = data ? Buffer.from(data, 'base64').toString() : null;


        messageBody = JSON.parse(messageBody);
        console.log('mwessage', message);
        console.log('mwessage', messageBody);
        if(messageBody?.type === "OrderCreated"){

            const order = messageBody.order;
            const projectKey = messageBody.projectKey;
            console.log('order created!');

            const customer = await customerService.getEmailFromCustomer(order?.customerId,projectKey)
            const email = customer?.customer?.email;

            let orderConfirmation = "";
            if(order?.order?.orderNumber){
                orderConfirmation =CONSTANTS.ORDER_CREATION_EMAIL.replaceAll("{{ORDER_INFORMATION}}"
                    ,` number ${order?.order?.orderNumber} and id ${order?.order?.id} `);
            }else{
                orderConfirmation =CONSTANTS.ORDER_CREATION_EMAIL.replaceAll("{{ORDER_INFORMATION}}"
                    ,` id ${order?.order?.id} `);
            }

            orderConfirmation = orderConfirmation + CONSTANTS.ORDER_CREATION_EMAIL;

            let LINE_ITEMS = `<tr><th>Name</th><th>Quantity</th><th>Price</th></tr>`;
            
            LINE_ITEMS = LINE_ITEMS + order.lineItems.map(l =>{
                return `<tr>
                                <th>${l.name['en-US']}</th>
                                <td>${l.quantity}</td>
                                <td>${l.price.value.centAmount/100}</td>
                            </tr>`
            }).toString();

            let priceSummary =`<table><tr><th>Total Net Price</th>
                            <th>Total Gross Price</th>
                            <th>Total Tax Price</th>
                            </tr>
                            <tr><td>${order.taxedPrice.totalNet.centAmount/100}</td>
                            <td>${order.taxedPrice.totalGross.centAmount/100}</td>
                            <td>${order.taxedPrice.totalTax.centAmount/100}</td>
                            </tr></table>`

            let summary = `<table>${LINE_ITEMS}</table><br><br>` + priceSummary

            console.log('summary',summary);
  
            const to =email;
            const result =await emailService.sendEmail({to,
                subject:"Order Created",html:summary});
            
            console.log('result',result);

        } 
        else if(messageBody?.type === "OrderStateChanged" && messageBody?.orderState === "Confirmed"){
            const projectKey = messageBody.projectKey;

            const orderId = messageBody.orderId;
            console.log(projectKey,orderId);

            const order = await orderService.getEmailFromOrder(messageBody.orderId,projectKey);

            if(order?.order?.customerId ){

                let customer = {};
                let email = order?.order?.customerEmail;
                if(!order?.order?.customerEmail){
                    customer = await customerService.getEmailFromCustomer(order?.order?.customerId,projectKey)

                    console.log('customer',customer?.customer?.email);

                    email = customer?.customer?.email;
                }
                let orderConfirmation = "";
                if(order?.order?.orderNumber){
                    orderConfirmation =CONSTANTS.ORDER_CONFIRMATON_EMAIL.replaceAll("{{ORDER_INFORMATION}}"
                        ,` number ${order?.order?.orderNumber} and id ${order?.order?.id} `);
                }else{
                    orderConfirmation =CONSTANTS.ORDER_CONFIRMATON_EMAIL.replaceAll("{{ORDER_INFORMATION}}"
                        ,` id ${order?.order?.id} `);
                }

                const to =email;
                // const to ="humza77@gmail.com"
                const result =await emailService.sendEmail({to,
                    subject:"Order Confirmation",html:orderConfirmation});
                console.log('order',order);
                console.log('result',result);


            }
        }
    }
);