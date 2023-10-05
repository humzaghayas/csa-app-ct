const functions = require("firebase-functions");
const { schedule } = require("firebase-functions/v1/pubsub");
const schedulesService = require("./services/schedulesService")();
const cartService = require("./services/cartService")();
const logger = functions.logger;
const fetch = require("node-fetch");

 exports.createScheduleOrders = functions.pubsub
     .schedule('*/1 * * * *')
     .onRun(async () =>{
         const date = new Date(Date.now());
         logger.info(`Set hours ${date.setHours(0,0,0,0)}`)
         logger.info(`Started execution order scheduler cron job. ${date.toISOString()} ${date?.getTime()}`)
                 
         try{
            logger.info(`Try: get all schedules.`)
            const projectKey="csa-project-4";
            const variables = {
                    "limit": 10,
                    "offset": 0,
                    "sort":{"lastModifiedAt": -1},
                    "filter":{"isActive":true, scheduleDate:date.toISOString()}
            }
            const schedules = await schedulesService.getSchedules({projectKey,variables});
            logger.info(`Total schedules ${schedules?.total}`);

            schedules?.results?.forEach(async schedule=>{
                const cartId = schedule?.value?.cartId ? schedule?.value?.cartId : schedule?.value?.orderId;
                logger.info(`Creating duplicate cart for cartId ${cartId}`)
                const cart = await cartService.replicateCart(cartId, "csa-project-4");
                const replicateCartId = cart?.replicateCart?.id;
                console.log("Cart",);
                logger.info(`Duplicate cart created with cartId ${replicateCartId}`);

                if(replicateCartId){
                    logger.info(`Creating payment for ${replicateCartId}`)
                    // const payment = await createPayment(replicateCartId);
                    logger.info(`Created payment for ${replicateCartId}`)
                }
            })
            

         }catch(err){
             logger.error(`Error while retrieving all schedules.`);
             logger.error(`Error message is ${err?.message}`);
         }
     });
 
async function createPayment(cartId) {
   const url = 'https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/stripe_payment/cart/csa-project-4/'+cartId;
   const response = await fetch(url);
   const jsonResponse = await response.json();
   return jsonResponse;
}       