const {getClient,projectKey } = require('../../config/commercetools-client');


module.exports = ()=>{

    const customObjectsService = {};

    customObjectsService.getTickets = async(container,key)=>{

        try {
            const client =  getClient();
            const results =await client.withProjectKey({projectKey}).customObjects()
                                .withContainerAndKey({container,key}).get().execute();
            
            return results.body.value;
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };

    customObjectsService.createTicets = async (ticket) => {
        try {
            const client = getClient();
            const results =await client.withProjectKey({projectKey}).customObjects()
                                .withContainerAndKey(container,key).get().execute();
            
            return results.body.value;
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };

    return customObjectsService;

}