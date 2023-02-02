const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const customObjectsService = require('./services/tickets')();
const {getTicketCategories,getTicketPriorityValues} = require('ct-tickets-helper-api');


const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

app.get('/', async(req, res) => {
    const {page,perPage } = req.query;

    try{
        let p = !page? 1:Number.parseInt(page);
        let perP = !perPage ?10: Number.parseInt(perPage);
        const results =await customObjectsService.getTickets(p,perP);
        res.status(200).json({result: results});
    }catch(err){
        res.status(400).json({Error: err});
    }
} );

app.post('/create-ticket', async(req, res) =>{

    const {data} = req.body;
    const result =await customObjectsService.createTicket(data);

    if(result.error){
        res.status(400).json({result: result.errors});    
    }else{
        res.status(200).json({result:result});
    }

});

app.get('/look-up/:field', async(req, res) =>{

    const {field} = req.params;

    switch(field) {
        case 'all' :
            const ticketCategoriesAll = getTicketCategories();
            const getTicketCategoriesOptsAll = Object.keys(ticketCategoriesAll).map((key) => ({
                label: ticketCategoriesAll[key],
                value: key,
              }));

            const ticketPriorityValAll =getTicketPriorityValues();
            const getTicketPriorityOptionsAll = Object.keys(ticketPriorityValAll).map((key) => ({
                label: ticketCategoriesAll[key],
                value: key,
            }));  

              res.status(200).json({
                categories:getTicketCategoriesOptsAll,
                priorities:getTicketPriorityOptionsAll
            });
          break;
        case 'category' :
            const ticketCategories = getTicketCategories();
            const getTicketCategoriesOpts = Object.keys(ticketCategories).map((key) => ({
                label: ticketCategories[key],
                value: key,
              }));

              res.status(200).json({categories:getTicketCategoriesOpts});
          break;
        case 'priority':
            const ticketPriorityVal =getTicketPriorityValues();
            const getTicketPriorityOptions = Object.keys(ticketPriorityVal).map((key) => ({
                label: ticketPriorityVal[key],
                value: key,
              }));

              res.status(200).json({priorities:getTicketPriorityOptions});
          break;
        default:{
            res.status(400).json({error:true,message :"Invalid lookup field!"});
        }
      }
});


app.get('/deleteCustomObjs', async(req, res) =>{

    await customObjectsService.deleteTickets();

    res.status(200).json({message:"done"});

});
exports.tickets = functions.https.onRequest(app);