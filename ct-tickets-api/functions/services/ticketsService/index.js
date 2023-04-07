const { clientDBConnection } = require('../../config/database');
const {getCreateTicketDraftForDB,createTicketHistoryForDB} =require ('ct-tickets-helper-api');
const { dataToFormValues } = require('../tickets/conversions');

const validateTicket = require('../tickets/validation')();

const adminDBService = require('../adminDBService')();
const {MONGO_TICKETS_COLLECTION} = process.env;

  module.exports = ()=>{

    const ticketsService = {};

  ticketsService.getTickets=async ({projectKey,page,perPage}) => {

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

        const offset = perPage * (page-1);
        results=await Tickets.find({}).limit(perPage).skip(offset);
        results = results.map(t => t.toObject());
      }else{

      }

    }catch(e){
      console.error(e);
    } 

    return results;
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


    }catch(err){
      console.log('error',err);
    } finally {
      
    }
  }
  return ticketsService;
}