const {getApiRoot,projectKey } = require('../../config/commercetools-client');
const {CREATE_CUSTOMOBJECT_MUTATION,FETCH_TICKETS,CONSTANTS,getTicketRows,
    getCreateTicketDraft,createTicketHistory} =require ('ct-tickets-helper-api');
const { dataToFormValues } = require('./conversions');

const validateTicket = require('./validation')();

module.exports = ()=>{

    const customObjectsService = {};

    customObjectsService.getTickets = async(page,perPage)=>{

        try {
            const apiRoot =  getApiRoot();
            // const results =await apiRoot.withProjectKey({projectKey}).customObjects()
            //                     .withContainerAndKey({container,key}).get().execute();



            const result = await apiRoot.withProjectKey({projectKey}).graphql()
                .post({
                    body : {
                        query: FETCH_TICKETS,
                        variables: {
                            container:CONSTANTS.containerKey,
                            limit: perPage,
                            offset: (page - 1) * perPage,
                            sort:["lastModifiedAt desc"]
                            },
                    }
                })
                .execute();
            

            console.log('results',result);
            const rows = getTicketRows(result?.body?.data?.customObjects);
            return rows;
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };

    customObjectsService.createTicket = async (ticket) => {
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


    customObjectsService.deleteTickets = async () => {
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

    return customObjectsService;

}