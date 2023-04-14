const {getApiRoot,projectKey } = require('../../config/commercetools-client');
const {CREATE_CUSTOMOBJECT_MUTATION,FETCH_TICKETS,CONSTANTS,FETCH_QUOTES_LIST,
    getCreateTicketDraft,createTicketHistory} =require ('ct-tickets-helper-api');

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

    quotesService.createTicket = async (ticket) => {
        try {
            const data = await dataToFormValues(ticket,false);
            const isValid = await validateTicket.validate(data);

            if(isValid.isError){
                return {error:true,errors:isValid.errors};
            }

            const ticketDraft = await getCreateTicketDraft(data);

            await createTicketHistory(data,ticketDraft);

            console.log('ticketDraft',ticketDraft);

            const apiRoot =  getApiRoot();
            const result = await apiRoot.withProjectKey({projectKey}).graphql()
                .post({
                    body : {
                        query: CREATE_CUSTOMOBJECT_MUTATION,
                        variables: {
                            draft: ticketDraft,
                          },
                    }
                })
                .execute();
            
            return result?.body?.data?.createOrUpdateCustomObject;
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error creating Ticket!"}
        }
    };


    quotesService.deleteTickets = async () => {
        try {

            const apiRoot =  getApiRoot();


            const result = await apiRoot.withProjectKey({projectKey}).graphql()
            .post({
                body : {
                    query: FETCH_TICKETS,
                    variables: {
                        container:CONSTANTS.containerKey,
                        limit: 50,
                        offset: 0,
                        sort:["lastModifiedAt desc"]
                        },
                }
            })
            .execute();

            const deleteCustomObj = `mutation($id:String,$version:Long){
                deleteCustomObject(version:$version,id:$id){
                 value
               } 
               }`;


            // for (const c of result?.body?.data?.customObjects?.results){


            // //let c = result?.body?.data?.customObjects?.results[0];
            //     const result1 = await apiRoot.withProjectKey({projectKey}).graphql()
            //     .post({
            //         body : {
            //             query: deleteCustomObj,
            //             variables: {
            //                 version:c.version,
            //                 id:c.id
            //               },
            //         }
            //     })
            //     .execute();
            // }
            
            return "test";//result?.body?.data?.createOrUpdateCustomObject;
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error creating Ticket!"}
        }
    };

    return quotesService;

}