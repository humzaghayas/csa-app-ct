require('dotenv').config();
const { FETCH_CUSTOMER_BY_ID } = require('../../GraphQL');
const { projectKey } = require('../../config/commercetools-client');
const graphQLService = require('../graphQLService')();

module.exports = ()=>{

    const customerService = {};

    customerService.getEmailFromCustomer = async(customerId,projectKey)=>{

        try {

            const result = graphQLService.execute(FETCH_CUSTOMER_BY_ID,{id:customerId},projectKey);

            console.log(result);

            return result;

        }catch(error){
            console.log(`Error: ${error}`);
            return {code:"error",message:"Error Sending Email!"}
        }
    };

    return customerService;

}