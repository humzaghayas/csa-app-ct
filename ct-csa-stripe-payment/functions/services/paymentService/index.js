const {PAYMENT_METHOD } = require('../../config/constants');

const stripeInclude = require('stripe');

const { CREATE_PAYMENT,ADD_PAYMENT_TO_CART } = require('../../GraphQL');
const {graphQLService} =require('ct-external-connections');
const orderService = require('../orderService')();
const cartService = require('../cartService')();

const {CT_STRIPE_URL,CT_STRIPE_API_KEY} = process.env;

  module.exports = ()=>{

    const paymentService = {};

  paymentService.createCheckoutSession=async ({projectKey,orderId}) => {

    let resultingValues = {};
    try{
      // const adminConf = await adminDBService.adminConfiguration(projectKey);
      
      // if(adminConf.error){
      //   console.log('error',adminConf);
      //   return adminConf;
      // }

      const order =await orderService.getOrderById(orderId,projectKey);
      
      // let apiRoot =adminConf[projectKey].apiRoot;
      // if(!apiRoot){
      //     apiRoot =  getApiRoot(adminConf[projectKey]);
      //     await adminDBService.setApiRoot(projectKey,apiRoot)
      // }
      console.log('order',order);

      if(!order){
        return null;
      }
      const line_items = order.order.lineItems.map(li => ({
          // li.taxedPrice.totalNet.centAmount
          price_data: {
            currency:li.taxedPrice.totalNet.currencyCode,
            unit_amount:li.taxedPrice.totalNet.centAmount,
            product_data:{
              name:li.variant.sku
            }
          },
          quantity: li.quantity,
        }
      ));

      const stripe = stripeInclude(CT_STRIPE_API_KEY);
      const session = await stripe.checkout.sessions.create({line_items,
        mode: 'payment',
        success_url: `${CT_STRIPE_URL}/success`,
        cancel_url: `${CT_STRIPE_URL}/cancel`,
        custom_text: {
          "order_id": order.order.id
        },
      }
      );

      return session;
    }catch(e){
      console.error(e);
    } 

    return null;
  }

  paymentService.createCheckoutSessionForCart=async ({projectKey,cartId}) => {

    let resultingValues = {};
    try{
      // const adminConf = await adminDBService.adminConfiguration(projectKey);
      
      // if(adminConf.error){
      //   console.log('error',adminConf);
      //   return adminConf;
      // }

      const cart =await cartService.getCartById(cartId,projectKey);
      
      // let apiRoot =adminConf[projectKey].apiRoot;
      // if(!apiRoot){
      //     apiRoot =  getApiRoot(adminConf[projectKey]);
      //     await adminDBService.setApiRoot(projectKey,apiRoot)
      // }
      console.log('cart',cart);

      if(!cart){
        return null;
      }
      const line_items = cart.cart.lineItems.map(li => ({
          // li.taxedPrice.totalNet.centAmount
          price_data: {
            currency:li.taxedPrice.totalNet.currencyCode,
            unit_amount:li.taxedPrice.totalNet.centAmount/li.quantity,
            product_data:{
              name:li.variant.sku
            }
          },
          quantity: li.quantity,
        }
      ));

      const stripe = stripeInclude(CT_STRIPE_API_KEY);
      const session = await stripe.checkout.sessions.create({line_items,
        mode: 'payment',
        success_url: `${CT_STRIPE_URL}/success`,
        cancel_url: `${CT_STRIPE_URL}/cancel`,
        client_reference_id:  `{"projectKey":"${projectKey}","cartId":"${cartId}"}`,
      }
      );

      return session;
    }catch(e){
      console.error(e);
    } 

    return null;
  }

  paymentService.getPaymentIntenet=async (paymentIntent) => {

    try{
        const stripe = stripeInclude(CT_STRIPE_API_KEY);
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntent);
      }catch(err){
        console.log('error',err);
      } 

  }

  paymentService.createPayment=async (stripePayment) => {

    try{

        const paymentStatus = stripePayment.payment_status;


        if(paymentStatus !== 'paid'){
          return false;
        }

        console.log('stripePayment.client_reference_id',stripePayment.client_reference_id);
       const {projectKey,cartId} = JSON.parse(stripePayment.client_reference_id);
      //  const {projectKey,cartId} = stripePayment.client_reference_id;
        const paymentIntent = stripePayment.payment_intent;
        const amountTotal = stripePayment.amount_total;
        const amountSubTotal = stripePayment.amount_subtotal;
        const paymentMethodsType = stripePayment.payment_method_types[0];
        const currency = stripePayment.currency.toUpperCase();

        var currentDateTime = new Date();

        let paymentObject = {
          "interfaceId" : paymentIntent,
          "amountPlanned": {
            "currencyCode": currency,
            "centAmount": amountTotal
          },
          "paymentMethodInfo": {
            "paymentInterface": "STRIPE",
            "method": PAYMENT_METHOD[paymentMethodsType].method,
            "name": PAYMENT_METHOD[paymentMethodsType].name
          },
          "transactions" : [ {
            "timestamp" : currentDateTime,
            "type" : "Charge",
            "amount" : {
              "currencyCode" : currency,
              "centAmount" : amountTotal
            },
            "state" : "Success"
            } ]
        };

        console.log('paymentObject',JSON.stringify(paymentObject));

        const result = await graphQLService.execute(CREATE_PAYMENT,{draft:paymentObject},projectKey);
        console.log('Payment Resutls: ',result);

        const paymentToCartAction = [{ 
          "addPayment":{
            "payment" : {
              "id" : result?.createPayment?.id,
              "typeId" : "payment"
            }
          }
        }];

        const cart = await cartService.getCartById(cartId,projectKey);
        console.log('paymentToCartAction ',paymentToCartAction);

        const resultPC = await graphQLService.execute(ADD_PAYMENT_TO_CART,
            {version:cart.cart.version,id:cartId,actions:paymentToCartAction},projectKey);

        console.log('payment ',resultPC);

      }catch(err){
        console.log('error',err);
      } 

  }

  return paymentService;
}