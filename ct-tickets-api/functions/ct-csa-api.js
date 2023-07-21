const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({}, "admkin-sf");
const { adminDBService } = require("ct-external-connections");
const express = require("express");
const cors = require("cors");
const app = express();
const ticketsService = require("./services/ticketsService")();
const customerService = require("./services/customer")();
// require('./ct-routes-ticekets')(app);

app.use(cors({ origin: true }));

app.post("/encrypt", async (req, res) => {
  const { value } = req.body;

  const encryptVal = await adminDBService.encryptValue(value);
  res.status(200).json({ [value]: encryptVal });
});

app.get("/reset-conf", async (req, res) => {
  await adminDBService.resetConfiguration();
  res.status(200).json({ message: "Successful!" });
});

app.post("/create/ticket", async (req, res) => {
  const { data, projectKey } = req.body;
  // const { projectKey } = req.session;
  console.log("create ticket:" + projectKey);

  const customer = await customerService.getCustomerByEmail(data?.email,projectKey);
  console.log("Customer id:",customer?.id);
  if(customer){
    data.customerId = customer?.id;
    const tickets = await ticketsService.createTicket(projectKey, data);

    if(tickets.error){
      res.status(400).json({tickets});
    }else{
      res.status(200).json({ tickets });
    }
  }else{
    res.status(404).json({error:`Customer with email: ${data?.email} not found in commercetools project: ${projectKey}`})
  }
  
});


exports.ct_csa_api = functions.https.onRequest(app);
