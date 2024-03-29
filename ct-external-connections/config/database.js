const mongoose = require("mongoose");
require("dotenv").config();
const adminSchema = require("./adminSchema");
const ticketSchema = require("./ticketSchema");
const feedbackSchema = require("./feedbackSchema");
const chatSchema = require("./chatSchema");
const { ServerApiVersion } = require("mongodb");

const { MONGO_ADMIN_URI, MONGO_ADMIN_DB, MONGO_TICKETS_DB, MONGO_CHAT_DB } =
  process.env;

const connect = (uri, dbName) => {
  // Connecting to the database
  return mongoose.createConnection(uri, {
    dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
};

const adminConnection = () => {
  let conn = connect(MONGO_ADMIN_URI, MONGO_ADMIN_DB);

  return adminSchema.registerSchema(conn);
};

const clientDBConnection = (uri) => {
  let conn = connect(uri, MONGO_TICKETS_DB);

  return ticketSchema.registerSchema(conn);
};

const feedbackDBConnection = (uri) => {
  let conn = connect(uri, MONGO_TICKETS_DB);

  return feedbackSchema.registerSchema(conn);
};

const chatDBConnection = (uri) => {
  let conn = connect(uri, MONGO_CHAT_DB);

  return chatSchema.registerSchema(conn);
};

module.exports = {
  adminConnection,
  clientDBConnection,
  feedbackDBConnection,
  chatDBConnection,
};
