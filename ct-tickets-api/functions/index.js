// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const customObjectsService = require('./services/tickets')();
const CONSTANTS = require('./config/constants');

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
// exports.getTickets = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;


//     const results =await customObjectsService.getTickets(CONSTANTS.SUBSCTIONTION_CONTAINER,
//         CONSTANTS.SUBSCTIONTION_KEY);

//        // res.status(200).send(formattedDate);
//     res.status(200).json({result: `Message with ID: ${JSON.stringify(results)} added.`});
//   });

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
        res.status(200).json({result: `${JSON.stringify(results)}`});
    }catch(err){
        res.status(400).json({Error: `${JSON.stringify(err)}`});
    }
} );

app.post('/create-ticket', async(req, res) =>{

    const {data} = req.body;
    const result =await customObjectsService.createTicket(data);

    if(result.error){
        res.status(400).json({result: JSON.stringify(result.errors)});    
    }else{
        res.status(200).json({result: JSON.stringify(result)});
    }

});

// Expose Express API as a single Cloud Function:
exports.tickets = functions.https.onRequest(app);
