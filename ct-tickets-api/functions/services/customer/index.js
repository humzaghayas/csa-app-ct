const {getApiRoot,projectKey } = require('../../config/commercetools-client');
const {FETCH_CUSTOMERS_EMAIL_BY_ID,FETCH_CUSTOMER_BY_EMAIL} =require ('ct-tickets-helper-api');
const {adminDBService,clientDBConnection} =require('ct-external-connections');

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


    customerService.getCustomerByEmail = async (email,projectKey) =>{
        try{

            console.log("Query:",FETCH_CUSTOMER_BY_EMAIL);

            const adminConf = await adminDBService.adminConfiguration(projectKey);

            if(adminConf.error){
              console.log('error',adminConf);
              return adminConf;
            }

            const apiRoot =  getApiRoot(adminConf[projectKey]);

            const result = await apiRoot.withProjectKey({projectKey}).graphql()
            .post({
                body : {
                    query: `query FetchCustomersByEmail($where:String!) {
                        customers(where: $where, limit:1) {
                          results {
                            id
                            customerNumber
                            externalId
                            firstName
                            dateOfBirth
                            lastName
                            companyName
                            email
                            customerGroup{
                            name
                            }
                            createdAt
                            lastModifiedAt
                            key
                          }
                        }
                      } 
                      `,
                    variables: {where:`email=\"${email}\"`},
                }
            })
            .execute();

            const customer = result?.body?.data?.customers?.results[0];

            return customer;

        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error !"}
        }
    }

    return customerService;
}