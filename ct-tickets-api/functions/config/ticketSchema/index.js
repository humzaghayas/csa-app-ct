require('dotenv').config();
const ticketSchema = require('./ticketsSchema');

const {MONGO_TICKETS_COLLECTION} = process.env;

module.exports.registerSchema = (db) => {

  return db.model(MONGO_TICKETS_COLLECTION, ticketSchema);
  // return db;
}