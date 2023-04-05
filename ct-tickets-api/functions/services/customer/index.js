const {getApiRoot,projectKey } = require('../../config/commercetools-client');
const {FETCH_CUSTOMERS_EMAIL_BY_ID} =require ('ct-tickets-helper-api');

module.exports = ()=>{

    const customerService = {};

    customerService.getCustomerEmailById = async (customerId) =>{
        
        try{
            const apiRoot =  getApiRoot();

            const result = await apiRoot.withProjectKey({projectKey}).graphql()
            .post({
                body : {
                    query: FETCH_CUSTOMERS_EMAIL_BY_ID,
                    variables: {id:customerId},
                }
            })
            .execute();

            console.log('result',result?.body?.data?.customer.email)

            return result?.body?.data?.customer.email;

        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error !"}
        }
    }

    return customerService;
}