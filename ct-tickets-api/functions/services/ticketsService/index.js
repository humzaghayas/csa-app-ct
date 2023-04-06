const { mongoClientConnection } = require('../../config/database');
const {getCreateTicketDraftForDB,createTicketHistoryForDB} =require ('ct-tickets-helper-api');
const { dataToFormValues } = require('../tickets/conversions');

const validateTicket = require('../tickets/validation')();

const adminDBService = require('../adminDBService')();
const {MONGO_TICKETS_COLLECTION} = process.env;

  module.exports = ()=>{

    const ticketsService = {};

  ticketsService.getTickets=async (projectKey) => {

    try{
      const adminConf = await adminDBService.fetchAdminConf();

      const projectConnection = adminConf.find(a => a._doc.projectKey === projectKey);

      console.log('projectConnection',projectConnection);

      if(projectConnection?._doc.isMongoDB){
        const Tickets = mongoClientConnection( projectConnection?._doc.connectionUri);

        return Tickets.find({});
      }

      // return adminConf;
    }catch(e){
      console.error(e);
    } 

    return [];
  }

  ticketsService.createTicket=async (projectKey,ticket) => {

    try{
      const adminConf = await adminDBService.fetchAdminConf();

      const projectConnection = adminConf.find(a => (a._doc.projectKey === projectKey ));

      console.log('projectConnection3',projectConnection);
      if(projectConnection?._doc?.isMongoDB){

        console.log('projectConnection2',projectConnection);

        const data = await dataToFormValues(ticket,false);
        const isValid = await validateTicket.validate(data);

        console.log('dastatv44',data);

        if(isValid.isError){
            return {error:true,errors:isValid.errors};
        }

        const ticketDraft = await getCreateTicketDraftForDB(data);

        await createTicketHistoryForDB(data,ticketDraft);

        console.log('ticketDraft',ticketDraft);

        const Ticket =await mongoClientConnection( projectConnection._doc.connectionUri);
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