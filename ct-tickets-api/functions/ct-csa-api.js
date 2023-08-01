const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({}, "admkin-sf");
const { adminDBService } = require("ct-external-connections");
const express = require("express");
const cors = require("cors");
const { sendTicketCreationEmail } = require("./services/emailService");
const app = express();
const ticketsService = require("./services/ticketsService")();
const customerService = require("./services/customer")();
const chatService = require("./services/chatService")();
const chatNoteService = require("./services/chatNoteService")();
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

app.post("/tickets-list", async (req, res) => {
  const { projectKey, variables } = req.body;
  // const { projectKey } = req.session;
  const results = await ticketsService.getTickets({ projectKey, variables });

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/create/ticket", async (req, res) => {
  const { data, projectKey } = req.body;
  // const { projectKey } = req.session;
  console.log("create ticket:" + projectKey);

  const customer = await customerService.getCustomerByEmail(
    data?.email,
    projectKey
  );
  console.log("Customer id:", customer?.id);
  if (customer) {
    data.customerId = customer?.id;
    const tickets = await ticketsService.createTicket(projectKey, data);

    if (tickets.error) {
      res.status(400).json({ tickets });
    } else {
      res.status(200).json({ tickets });
      ///send email
      sendTicketCreationEmail(tickets);
    }
  } else {
    res.status(404).json({
      error: `Customer with email: ${data?.email} not found in commercetools project: ${projectKey}`,
    });
  }
});

app.post("/create-startChat-db", async (req, res) => {
  const { projectKey, data } = req.body;
  // const { projectKey } = req.session;
  console.log("create chat:" + projectKey);

  const chats = await chatService.createStartChat(projectKey, data);

  // if(result.error){
  //     res.status(400).json({result: result.errors});
  // }else{
  res.status(200).json({ chats });
  //}
});

app.post("/chat-startList", async (req, res) => {
  const { variables, projectKey } = req.body;
  // const {  } = req.session;
  const results = await chatService.getChats({ projectKey, variables });

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/chat-noteList", async (req, res) => {
  const { projectKey, variables } = req.body;
  // const { projectKey } = req.session;
  const results = await chatNoteService.getChatsNote({ projectKey, variables });

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/cUpdate-noteChat-db", async (req, res) => {
  const { projectKey, data } = req.body;
  // const { projectKey } = req.session;
  console.log("create ticket:" + projectKey);

  const chatNote = await chatNoteService.createChatNote(projectKey, data);

  // if(result.error){
  //     res.status(400).json({result: result.errors});
  // }else{
  res.status(200).json({ chatNote });
  //}
});

exports.ct_csa_api = functions.https.onRequest(app);
