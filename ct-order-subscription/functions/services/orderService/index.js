require('dotenv').config();
const { FETCH_ORDER_BY_ID } = require('../../GraphQL');
const { projectKey } = require('../../config/commercetools-client');
const graphQLService = require('../graphQLService')();

module.exports = ()=>{

    const orderService = {};

    orderService.getEmailFromOrder = async(orderId,projectKey)=>{

        try {

            const result = graphQLService.execute(FETCH_ORDER_BY_ID,{id:orderId},projectKey);

            console.log(result);

            return result;

        }catch(error){
            console.log(`Error: ${error}`);
            return {code:"error",message:"Error Sending Email!"}
        }
    };

    return orderService;

}