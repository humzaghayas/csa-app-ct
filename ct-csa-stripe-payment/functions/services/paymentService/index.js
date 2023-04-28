const { clientDBConnection } = require('../../config/database');
const {getApiRoot } = require('../../config/commercetools-client');

const stripeInclude = require('stripe');

const adminDBService = require('../adminDBService')();
const orderService = require('../orderService')();

const {CT_STRIPE_URL,CT_STRIPE_API_KEY} = process.env;

  module.exports = ()=>{

    const paymentService = {};

  paymentService.createCheckoutSession=async ({projectKey,orderId}) => {

    let resultingValues = {};
    try{
      // const adminConf = await adminDBService.adminConfiguration(projectKey);
      
      // if(adminConf.error){
      //   console.log('error',adminConf);
      //   return adminConf;
      // }

      const order =await orderService.getOrderById(orderId,projectKey);
      
      // let apiRoot =adminConf[projectKey].apiRoot;
      // if(!apiRoot){
      //     apiRoot =  getApiRoot(adminConf[projectKey]);
      //     await adminDBService.setApiRoot(projectKey,apiRoot)
      // }
      console.log('order',order);

      if(!order){
        return null;
      }
      const line_items = order.order.lineItems.map(li => ({
          // li.taxedPrice.totalNet.centAmount
          price_data: {
            currency:li.taxedPrice.totalNet.currencyCode,
            unit_amount:li.taxedPrice.totalNet.centAmount,
            product_data:{
              name:li.variant.sku
            }
          },
          quantity: li.quantity,
        }
      ));

      const stripe = stripeInclude(CT_STRIPE_API_KEY);
      const session = await stripe.checkout.sessions.create({line_items,
        mode: 'payment',
        success_url: `${CT_STRIPE_URL}/success`,
        cancel_url: `${CT_STRIPE_URL}/cancel`,}
      );

      return session;
    }catch(e){
      console.error(e);
    } 

    return null;
  }

  paymentService.createTicket=async (projectKey,ticket) => {

    try{
        const adminConf = await adminDBService.adminConfiguration(projectKey);

        if(adminConf.error){
          console.log('error',adminConf);
          return adminConf;
        }

        const conf = adminConf[projectKey];

        if(conf.isDatabase){
          return await paymentService.createTicketMongo(conf,ticket);
        
        }else{

          return await paymentService.createTicketCO(ticket)
        }

      }catch(err){
        console.log('error',err);
      } 

  }

  paymentService.createTicketMongo=async (conf,ticket) => {
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



  paymentService.createTicketCO=async (ticket)=>{

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


  paymentService.getTicketById=async (projectKey,id) => {

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
  return paymentService;
}