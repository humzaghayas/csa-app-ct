const {getApiRoot } = require('../../config/commercetools-client');
const {FETCH_ORDER_BY_ID,FETCH_CUSTOMERS_DETAILS} =require ('ct-tickets-helper-api');
const {graphQLService} =require('ct-external-connections');

module.exports = ()=>{

    const orderService = {};

    orderService.getOrderById = async(orderId,projectKey)=>{

        try {
            const result = await graphQLService.execute(FETCH_ORDER_BY_ID, {id: orderId},projectKey);
            
            console.log('order',result);

            const order = result?.order;

            const paymentInfo = order?.paymentInfo;

            console.log('order?.paymentInfo',JSON.stringify(paymentInfo));

            if(paymentInfo){
                    const trans = paymentInfo?.payments?.map(p =>{
                        return p.transactions.map(t => {
                            if(t.state === "Success"){
                                return t.amount.centAmount;
                            }
                        })[0];
                    })

                    if(trans && trans.length > 0){
                        const sum = trans.reduce((a, b) => a + b,0);

                        if(sum >= order?.taxedPrice?.totalNet?.centAmount){
                            return {payment:true,data:result}
                        }else{
                            return {payment:false,data:result}
                        }
                    }
            }
            
            return {payment:false,message_code:"ERROR"}
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };

    orderService.getCustomerByOrderId = async(orderId,projectKey)=>{

        try {
            const result = await graphQLService.execute(FETCH_ORDER_BY_ID, {id: orderId},projectKey);
            
            console.log('order',result);

           const order = result?.order;

            if(order?.customerId){
                const resultCust = await graphQLService.execute(FETCH_CUSTOMERS_DETAILS, {id: order.customerId},projectKey);

                return resultCust?.customer;
            }
            return null
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };


    return orderService;

}