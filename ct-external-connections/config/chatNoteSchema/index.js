require("dotenv").config();
const chatNoteSchema = require("./chatNoteSchema");

const { MONGO_CHATMESSAGE_COLLECTION } = process.env;

module.exports.registerSchema = (db) => {
  return db.model(MONGO_CHATMESSAGE_COLLECTION, chatNoteSchema);
  // return db;
};
