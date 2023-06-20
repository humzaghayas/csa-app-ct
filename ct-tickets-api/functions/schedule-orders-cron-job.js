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
                    const payment = await createPayment(replicateCartId);
                    logger.info(`Created payment for ${replicateCartId}`)
                }

                scheduleNextDate(schedule,date);

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

async function scheduleNextDate(schedule,date){

    const newDate = new Date(date);

    logger.info("Updating schedule for next schedule date",schedule?.id ?? schedule?._id);
    
    const updateSchedule = {
        ...schedule.value,
        id:schedule?.id
    }

    switch(updateSchedule?.repeat){
        case 'month':
            getNextDate(newDate,1);
            break;
        case '2month':
            getNextDate(newDate,2);
            break;
        case '3month':
            getNextDate(newDate,3);
            break;
    }


    console.log("Next schedule date is ",newDate);
    updateSchedule.scheduleDate = newDate;
    console.log("Update schedule",updateSchedule);
    // schedulesService.createSchedule("csa-project-4",schedule);
    logger.info("Update schedule for next schedule date");
}

async function getNextDate(newDate,incrementMonths){
    if((newDate.getMonth()+incrementMonths)%12==0){
        newDate.setMonth(1);
    }else newDate.setMonth((newDate.getMonth()+incrementMonths)%12);            
    if((newDate.getMonth()+incrementMonths>12)){
        newDate.setFullYear(newDate.getFullYear()+1)
    }
    return newDate;
}