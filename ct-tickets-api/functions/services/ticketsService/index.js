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

    let resultingValues = {};
    try{
      const adminConf = await adminDBService.adminConfiguration(projectKey);
      
      if(adminConf.error){
        console.log('error',adminConf);
        return adminConf;
      }

      
      if(adminConf[projectKey].isDatabase){
        let filter = {};
        
        if(variables?.filter){

          for(let key of Object.keys(variables?.filter)){
            filter[key]= new RegExp(variables?.filter[key] ,'i');
          }
        }
        

        const uri = adminConf[projectKey].connectionUri.replace("{{USERNAME}}",adminConf[projectKey].username)
                .replace("{{PASSWORD}}",adminConf[projectKey].password);

        const Tickets =await clientDBConnection( uri);

        const offset = variables.offset;
        let r=await Tickets.find(filter).limit(variables.limit).skip(offset).sort(variables.sort);
        resultingValues.results = r.map(t => {return {id:t.toObject()._id,value:t.toObject()}});

        resultingValues.total = await Tickets.count(filter);
        resultingValues.limit = variables.limit;
        resultingValues.offset = offset;
        resultingValues.count = r.length;

      }else{

      }

    }catch(e){
      console.error(e);
    } 

    return resultingValues;
  }

  ticketsService.createTicket=async (projectKey,ticket) => {

    try{
        const adminConf = await adminDBService.adminConfiguration(projectKey);

        if(adminConf.error){
          console.log('error',adminConf);
          return adminConf;
        }

        const conf = adminConf[projectKey];

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
    const data = await dataToFormValues(ticket,false);

    console.log('data kasnkasdkasd',data);
    const isValid = await validateTicket.validate(data);


    if(isValid.isError){
        return {error:true,errors:isValid.errors};
    }

    const ticketDraft = await getCreateTicketDraftForDB(data);

    await createTicketHistoryForDB(data,ticketDraft);

    console.log('ticketDraft',ticketDraft);

    const uri = conf.connectionUri.replace("{{USERNAME}}",conf.username)
              .replace("{{PASSWORD}}",conf.password);

    const Ticket =await clientDBConnection( uri);

    if(ticketDraft._id){
      let doc1 = new Ticket(ticketDraft);
      return await Ticket.findOneAndUpdate({_id:ticketDraft._id}, ticketDraft, {
          new: true,
        });
    }else{
      let doc1 = new Ticket(ticketDraft);    
      return await doc1.save();
    }



    return doc;
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


  ticketsService.getTicketById=async (id) => {

    let result = {};
    try{
      const adminConf = await adminDBService.adminConfiguration(projectKey);
      
      if(adminConf.error){
        console.log('error',adminConf);
        return adminConf;
      }

      
      if(adminConf[projectKey].isDatabase){

        const uri = adminConf[projectKey].connectionUri.replace("{{USERNAME}}",adminConf[projectKey].username)
                .replace("{{PASSWORD}}",adminConf[projectKey].password);

        const Tickets =await clientDBConnection( uri);
        result=await Tickets.findById( id);

        console.log('find by id',result);
      }else{

      }

    }catch(e){
      console.error(e);
    } 

    return result;
  }
  return ticketsService;
}