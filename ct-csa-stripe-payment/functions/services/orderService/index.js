require('dotenv').config();
const { FETCH_ORDER_BY_ID, CREATE_ORDER_FROMCART } = require('../../GraphQL');
const {graphQLService} =require('ct-external-connections');

module.exports = ()=>{

    const orderService = {};

    orderService.getOrderById = async(orderId,projectKey)=>{

        try {

            const result = await graphQLService.execute(FETCH_ORDER_BY_ID,{id:orderId},projectKey);

            console.log(result);

            return result;

        }catch(error){
            console.log(`Error: ${error}`);
            return {code:"error",message:"Error Sending Email!"}
        }
    };


    orderService.createOrderFromCart = async(cartVar,projectKey)=>{

        try {

            const result = await graphQLService.execute(CREATE_ORDER_FROMCART,{draft: {
                                cart: {id: cartVar.id,},
                                version: cartVar.version,
                            }},projectKey);

            console.log(result);

            return result;

        }catch(error){
            console.log(`Error: ${error}`);
            return {code:"error",message:"Error Sending Email!"}
        }
    };
    return orderService;

}