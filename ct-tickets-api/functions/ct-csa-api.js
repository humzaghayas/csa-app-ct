
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({},"admkin-sf");
const {adminDBService} =require('ct-external-connections');
const express = require('express');
const cors = require('cors');

const app = express();

// require('./ct-routes-ticekets')(app);

app.use(cors({ origin: true }));



app.post('/encrypt', async(req, res) =>{
    const {value} = req.body;

    const encryptVal = await adminDBService.encryptValue(value);
    res.status(200).json({[value]:encryptVal});
});

exports.ct_csa_api = functions.https.onRequest(app);