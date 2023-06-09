const {PAYMENT_METHOD } = require('../../config/constants');

const stripeInclude = require('stripe');

const { CREATE_PAYMENT,ADD_PAYMENT_TO_CART ,ADD_PAYMENT_TO_ORDER} = require('../../GraphQL');
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
            currency:li.taxedPrice.totalGross.currencyCode,
            unit_amount:li.taxedPrice.totalGross.centAmount,
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
      console.log('cart',JSON.stringify(cart));

      if(!cart){
        return null;
      }
      const line_items = cart.cart.lineItems.map(li => {
        
        let quantityAlreadyCharged = 0;
        if(li?.custom?.customFieldsRaw){

          quantityAlreadyCharged = li?.custom?.customFieldsRaw?.find(c => c.name==="quantity_charged");
          quantityAlreadyCharged =quantityAlreadyCharged.value;
        }

        if(li.quantity > quantityAlreadyCharged){
          return {
            // li.taxedPrice.totalNet.centAmount
            price_data: {
              currency:li.taxedPrice.totalGross.currencyCode,
              unit_amount:li.taxedPrice.totalGross.centAmount/li.quantity,
              product_data:{
                name:li.variant.sku
              }
            },
            quantity: li.quantity - quantityAlreadyCharged,
          }
        }else {
          return null;
        }
      }).filter(l => l !== null);

      const stripe = stripeInclude(CT_STRIPE_API_KEY);

      console.log('line_items',line_items);
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

  paymentService.createCheckoutSessionForOrder=async ({projectKey, orderId}) => {

    let resultingValues = {};
    try{

      const order =await orderService.getOrderById(orderId,projectKey);
      console.log('order',order);

      if(!order){
        return null;
      }
      const line_items = order.order.lineItems.map(li => {
        
        let quantityAlreadyCharged = 0;
        if(li?.custom?.customFieldsRaw){

          quantityAlreadyCharged = li?.custom?.customFieldsRaw?.find(c => c.name==="quantity_charged");
          quantityAlreadyCharged =quantityAlreadyCharged.value;
        }

        if(li.quantity > quantityAlreadyCharged){
          return {
            // li.taxedPrice.totalNet.centAmount
            price_data: {
              currency:li.taxedPrice.totalGross.currencyCode,
              unit_amount:li.taxedPrice.totalGross.centAmount/li.quantity,
              product_data:{
                name:li.variant.sku
              }
            },
            quantity: li.quantity - quantityAlreadyCharged,
          }
        }else {
          return null;
        }
      }).filter(l => l !== null);

      const stripe = stripeInclude(CT_STRIPE_API_KEY);
      const session = await stripe.checkout.sessions.create({line_items,
        mode: 'payment',
        success_url: `${CT_STRIPE_URL}/success`,
        cancel_url: `${CT_STRIPE_URL}/cancel`,
        client_reference_id:  `{"projectKey":"${projectKey}","orderId":"${orderId}"}`,
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

        const sessionId = stripePayment.id;
        console.log('stripePayment.client_reference_id',stripePayment.client_reference_id);
       const {projectKey,cartId,orderId} = JSON.parse(stripePayment.client_reference_id);
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

        let cart ;
        let obj;
        let order;
        if(cartId){
          cart = await cartService.getCartById(cartId,projectKey);
          obj = cart.cart;
        }else{
          order = await orderService.getOrderById(orderId,projectKey);
          obj = order.order;
        }
       

        let paymentToCartAction = [{ 
          "addPayment":{
            "payment" : {
              "id" : result?.createPayment?.id,
              "typeId" : "payment"
            }
          }
        }];

        paymentToCartAction = paymentToCartAction.concat (attachCustomTypesToLineitems(obj,sessionId));

        
        console.log('paymentToCartAction 121212: ',JSON.stringify(paymentToCartAction));

        if(cartId){
          const resultPC = await graphQLService.execute(ADD_PAYMENT_TO_CART,
              {version:cart.cart.version,id:cartId,actions:paymentToCartAction},projectKey);

          console.log('payment ',resultPC);
        }else{
          const resultPC = await graphQLService.execute(ADD_PAYMENT_TO_ORDER,
              {version:order.order.version,id:orderId,actions:paymentToCartAction},projectKey);

          console.log('payment ',resultPC);
        }

      }catch(err){
        console.log('error',err);
      } 

  }

  const attachCustomTypesToLineitems = (cart,sessionId) => {
    let sessionIds = cart.lineItems.map(l => ({
          stripeSessionIdList :l.custom?.customFieldsRaw?.find(c => c.name === 'stripe_session_ids')?.value,
          lineItemId : l.id,
          quantity_charged:l.quantity
          }));
    //       console.log('session ids ',sessionIds);
    // sessionIds =JSON.parse(sessionIds);

    console.log('session ids ',sessionIds);

    return sessionIds.map(s =>{
        let stripeSessionIdList;
        if(s.stripeSessionIdList){
          stripeSessionIdList =s.stripeSessionIdList;
        }else{
          stripeSessionIdList=[];
        }

        stripeSessionIdList.push(sessionId);
      return {
        setLineItemCustomType:{
          lineItemId:s.lineItemId,
          type:{
            key:"line-item-custom-type",
            typeId:"type"
          },
          fields:[
            {
              name:"stripe_session_ids",
              value:JSON.stringify(stripeSessionIdList)
            },
            {
              name:"quantity_charged",
              value:`${s.quantity_charged}`
            }
          ]
        }}
    });
  }

  return paymentService;
}