/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");

exports.createScheduleOrders = functions.pubsub
    .schedule('*/1 * * * *')
    .onRun(async () =>{
        // const orders = 
        console.log("Hello world");
        console.log(Date.now()); 
        return "Hello world";
    });

