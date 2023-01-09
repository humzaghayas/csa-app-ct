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

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
// app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
app.get('/test', async(req, res) => {
        const results =await customObjectsService.getTickets(CONSTANTS.SUBSCTIONTION_CONTAINER,
        CONSTANTS.SUBSCTIONTION_KEY);
    res.status(200).json({result: `Message with ID: ${JSON.stringify(results)} added.`});
} );

// Expose Express API as a single Cloud Function:
exports.tickets = functions.https.onRequest(app);
