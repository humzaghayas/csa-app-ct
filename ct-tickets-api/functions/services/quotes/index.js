const {getApiRoot,projectKey } = require('../../config/commercetools-client');
const {FETCH_QUOTES_REQUEST_LIST,FETCH_QUOTES_LIST} =require ('ct-tickets-helper-api');

module.exports = ()=>{

    const quotesService = {};

    quotesService.getQuotesByCustomer = async(page,perPage,customerId)=>{

        try {
            const apiRoot =  getApiRoot();
            // const results =await apiRoot.withProjectKey({projectKey}).customObjects()
            //                     .withContainerAndKey({container,key}).get().execute();



            const result = await apiRoot.withProjectKey({projectKey}).graphql()
                .post({
                    body : {
                        query: FETCH_QUOTES_LIST,
                        variables: {
                            limit: perPage,
                            offset: (page - 1) * perPage,
                            //sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
                            where: "customer(id=\"" + customerId + "\") and custom is not defined",
                        },
                    }
                })
                .execute();
            
            console.log('quotes',result);
            return result.body.data.quotes;
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };

    quotesService.getQuotesRequestsByCustomer = async(page,perPage,customerId)=>{

        try {
            const apiRoot =  getApiRoot();
            // const results =await apiRoot.withProjectKey({projectKey}).customObjects()
            //                     .withContainerAndKey({container,key}).get().execute();



            const result = await apiRoot.withProjectKey({projectKey}).graphql()
                .post({
                    body : {
                        query: FETCH_QUOTES_REQUEST_LIST,
                        variables: {
                            limit: perPage,
                            offset: (page - 1) * perPage,
                            //sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
                            where: "customer(id=\"" + customerId + "\")  AND quoteRequestState=\"Submitted\"",
                        },
                    }
                })
                .execute();
            
            console.log('quotes',result);
            return result.body.data.quoteRequests;
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };

    return quotesService;

}