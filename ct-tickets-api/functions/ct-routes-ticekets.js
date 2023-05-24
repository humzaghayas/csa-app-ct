const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({}, "admin");

const customObjectsService = require("./services/tickets")();
const quotesService = require("./services/quotes")();
const customerService = require("./services/customer")();
const ticketsService = require("./services/ticketsService")();
const { adminDBService } = require("ct-external-connections");
const cartService = require("./services/cartService")();
const orderService = require("./services/orderService")();
const feedbackService = require("./services/feedbackService")();
const {
  getTicketCategories,
  getTicketPriorityValues,
} = require("ct-tickets-helper-api");

const express = require("express");
const cors = require("cors");
const {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} = require("@commercetools-backend/express");

const app = express();
const { CT_MC_AUDIENCE_URL } = process.env;

app.use(
  createSessionMiddleware({
    audience: CT_MC_AUDIENCE_URL,
    issuer: CLOUD_IDENTIFIERS.GCP_US,
    inferIssuer: true,
  })
);

// require('./ct-routes-ticekets')(app);

app.use(cors({ origin: true }));

app.get("/", async (req, res) => {
  const { page, perPage } = req.query;

  try {
    let p = !page ? 1 : Number.parseInt(page);
    let perP = !perPage ? 10 : Number.parseInt(perPage);
    const results = await customObjectsService.getTickets(p, perP);
    res.status(200).json({ result: results });
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

app.post("/create-ticket", async (req, res) => {
  const { data } = req.body;
  const result = await customObjectsService.createTicket(data);

  if (result.error) {
    res.status(400).json({ result: result.errors });
  } else {
    res.status(200).json({ result: result });
  }
});

app.post("/customer-quotes", async (req, res) => {
  const { page, perPage, customerId } = req.body;
  const result = await quotesService.getQuotesByCustomer(
    page,
    perPage,
    customerId
  );

  if (result.error) {
    res.status(400).json({ result: result.errors });
  } else {
    res.status(200).json(result);
  }
});

app.post("/customer-quotes-requests", async (req, res) => {
  const { page, perPage, customerId } = req.body;
  const result = await quotesService.getQuotesRequestsByCustomer(
    page,
    perPage,
    customerId
  );

  if (result.error) {
    res.status(400).json({ result: result.errors });
  } else {
    res.status(200).json(result);
  }
});

app.post("/customer-quotes-staged", async (req, res) => {
  const { page, perPage, customerId } = req.body;
  const result = await quotesService.getStagedQuotesByCustomer(
    page,
    perPage,
    customerId
  );

  if (result.error) {
    res.status(400).json({ result: result.errors });
  } else {
    res.status(200).json(result);
  }
});
app.post("/create-customer-quote", async (req, res) => {
  const draft = req.body;

  console.log("draft", draft);
  const result = await quotesService.createQuoteRequestForCustomer(draft);

  if (result.error) {
    res.status(400).json({ result: result.errors });
  } else {
    res.status(200).json(result);
  }
});

app.post("/create-ticket-chatbot", async (req, res) => {
  const data = JSON.parse(req.body);
  // const data = req.body;

  console.log("data", data);
  console.log("data?.customerId", data?.customerId);
  const email = await customerService.getCustomerEmailById(data?.customerId);
  console.log("email5t", email);

  const tic = {
    ...data,
    type: data.category,
    contactType: "chat_bot",
    status: "new",
    email,
    createdBy: email,
    assignedTo: "",
  };

  console.log("tic", tic);
  const result = await customObjectsService.createTicket(tic);

  if (result.error) {
    res.status(400).json({ result: result.errors });
  } else {
    res.status(200).json({ result: result });
  }
});

app.get("/look-up/:field", async (req, res) => {
  const { field } = req.params;

  switch (field) {
    case "all":
      const ticketCategoriesAll = getTicketCategories();
      const getTicketCategoriesOptsAll = Object.keys(ticketCategoriesAll).map(
        (key) => ({
          label: ticketCategoriesAll[key],
          value: key,
        })
      );

      const ticketPriorityValAll = getTicketPriorityValues();
      const getTicketPriorityOptionsAll = Object.keys(ticketPriorityValAll).map(
        (key) => ({
          label: ticketCategoriesAll[key],
          value: key,
        })
      );

      res.status(200).json({
        categories: getTicketCategoriesOptsAll,
        priorities: getTicketPriorityOptionsAll,
      });
      break;
    case "category":
      const ticketCategories = getTicketCategories();
      const getTicketCategoriesOpts = Object.keys(ticketCategories).map(
        (key) => ({
          label: ticketCategories[key],
          value: key,
        })
      );

      res.status(200).json({ categories: getTicketCategoriesOpts });
      break;
    case "priority":
      const ticketPriorityVal = getTicketPriorityValues();
      const getTicketPriorityOptions = Object.keys(ticketPriorityVal).map(
        (key) => ({
          label: ticketPriorityVal[key],
          value: key,
        })
      );

      res.status(200).json({ priorities: getTicketPriorityOptions });
      break;
    default: {
      res.status(400).json({ error: true, message: "Invalid lookup field!" });
    }
  }
});

app.get("/deleteCustomObjs", async (req, res) => {
  await customObjectsService.deleteTickets();

  res.status(200).json({ message: "done" });
});

app.post("/encrypt", async (req, res) => {
  const { value } = req.body;

  const encryptVal = await adminDBService.encryptValue(value);
  res.status(200).json({ [value]: encryptVal });
});

// app.post('/decrypt', async(req, res) =>{
//     const {value} = req.body;

//     const decryptVal = await adminDBService.decryptValue(value);
//     res.status(200).json({[value]:decryptVal});
// });

app.post("/tickets-list", async (req, res) => {
  const { variables } = req.body;
  const { projectKey } = req.session;
  const results = await ticketsService.getTickets({ projectKey, variables });

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/create-ticket-db", async (req, res) => {
  const { data } = req.body;
  const { projectKey } = req.session;
  console.log("create ticket:" + projectKey);

  const tickets = await ticketsService.createTicket(projectKey, data);

  // if(result.error){
  //     res.status(400).json({result: result.errors});
  // }else{
  res.status(200).json({ tickets });
  //}
});

app.get("/ticket-db/:id", async (req, res) => {
  // const isAuthenticate = jwtAuthenticationService.authenticate(req,res);

  // if(isAuthenticate &&  isAuthenticate.error){
  //     res.status(400).json({isAuthenticate});
  //     return;
  // }

  const { id } = req.params;
  //const projectKey = req.query.projectKey;
  const { projectKey } = req.session;

  console.log("p", projectKey);
  const results = await ticketsService.getTicketById(projectKey, id);

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/cart-by-id", async (req, res) => {
  const { cartId, isQuoteRequest } = req.body;
  const { projectKey } = req.session;

  console.log("p", projectKey);
  const results = await cartService.getCartById(
    cartId,
    isQuoteRequest,
    projectKey
  );

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/customer-by-cartid", async (req, res) => {
  const { cartId } = req.body;
  const { projectKey } = req.session;

  console.log("p", projectKey);
  const results = await cartService.getCustomerByCartId(cartId, projectKey);

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.get("/payment-link", async (req, res) => {
  const { projectKey } = req.session;

  const adminConf = await adminDBService.adminConfiguration(projectKey);

  if (adminConf.error) {
    res.status(400).json({ error: true, message: "Configuration not found!" });
    return;
  }

  res.status(200).json({ paymentLink: adminConf.PAYMENT_LINK });
});

app.post("/order-by-id", async (req, res) => {
  const { orderId } = req.body;
  const { projectKey } = req.session;

  console.log("p", projectKey);
  const results = await orderService.getOrderById(orderId, projectKey);

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/customer-by-orderid", async (req, res) => {
  const { orderId } = req.body;
  const { projectKey } = req.session;

  console.log("p", projectKey);
  const results = await orderService.getCustomerByOrderId(orderId, projectKey);

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/feedback-list", async (req, res) => {
  const { variables } = req.body;
  const { projectKey } = req.session;
  const results = await feedbackService.getFeedbacks({ projectKey, variables });

  if (results.error) {
    res.status(400).json(results);
  } else {
    res.status(200).json(results);
  }
});

app.post("/create-feedback-db", async (req, res) => {
  const { data } = req.body;
  const { projectKey } = req.session;
  console.log("create ticket:" + projectKey);

  const feedbacks = await feedbackService.createFeedback(projectKey, data);

  // if(result.error){
  //     res.status(400).json({result: result.errors});
  // }else{
  res.status(200).json({ feedbacks });
  //}
});

exports.tickets = functions.https.onRequest(app);
