const { clientDBConnection } = require('../../config/database');
const {CREATE_CUSTOMOBJECT_MUTATION,getCreateTicketDraftForDB,createTicketHistoryForDB,
  getCreateTicketDraft,createTicketHistory} =require ('ct-tickets-helper-api');
const { dataToFormValues } = require('../tickets/conversions');
const {getApiRoot,projectKey } = require('../../config/commercetools-client');

const validateTicket = require('../tickets/validation')();

const adminDBService = require('../adminDBService')();
const {MONGO_TICKETS_COLLECTION} = process.env;

  module.exports = ()=>{

    const ticketsService = {};

  ticketsService.getTickets=async ({projectKey,variables}) => {

    let results = [];
    try{
      const adminConf = await adminDBService.adminConfiguration(projectKey);
      
      if(adminConf.error){
        console.log('error',adminConf);
        return adminConf;
      }

      if(adminConf[projectKey].isDatabase){

        console.log('bbbbb');
        const uri = adminConf[projectKey].connectionUri.replace("{{USERNAME}}",adminConf[projectKey].username)
                .replace("{{PASSWORD}}",adminConf[projectKey].password);

        const Tickets =await clientDBConnection( uri);

        const offset = variables.offset;
        results=await Tickets.find({}).limit(variables.limit).skip(offset).sort(variables.sort);
        results = results.map(t => {return {id:t.toObject()._id,value:t.toObject()}});
      }else{

      }

    }catch(e){
      console.error(e);
    } 

    return {results};
  }

  ticketsService.createTicket=async (projectKey,ticket) => {

    try{
        const adminConf = await adminDBService.adminConfiguration(projectKey);

        if(adminConf.error){
          console.log('error',adminConf);
          return adminConf;
        }

        const conf = adminConf[projectKey];

        console.log('conf3',conf);
        if(conf.isDatabase){
          return await ticketsService.createTicketMongo(conf,ticket);
        
        }else{

          return await ticketsService.createTicketCO(ticket)
        }

      }catch(err){
        console.log('error',err);
      } 

  }

  ticketsService.createTicketMongo=async (conf,ticket) => {
    console.log('conf2',conf);

    const data = await dataToFormValues(ticket,false);
    const isValid = await validateTicket.validate(data);

    console.log('dastatv44',data);

    if(isValid.isError){
        return {error:true,errors:isValid.errors};
    }

    const ticketDraft = await getCreateTicketDraftForDB(data);

    await createTicketHistoryForDB(data,ticketDraft);

    console.log('ticketDraft',ticketDraft);

    const uri = conf.connectionUri.replace("{{USERNAME}}",conf.username)
              .replace("{{PASSWORD}}",conf.password);

    const Ticket =await clientDBConnection( uri);
    let doc1 = new Ticket(ticketDraft);
    return await doc1.save();
  }



  ticketsService.createTicketCO=async (ticket)=>{

        return{};
        let data = ticket;
        const ticketDraft = await getCreateTicketDraft(data);

        await createTicketHistory(data,ticketDraft,'CREATED');

        console.log('ticketDraft',ticketDraft);
      
        apiRoot =  conf.apiRoot;
        
        if(!conf.apiRoot){
          apiRoot =getApiRoot(conf);
          await adminDBService.setApiRoot(projectKey,apiRoot);
        }

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


      console.log('resutls',result);

      return result?.body?.data?.createOrUpdateCustomObject;
  }
  return ticketsService;
}