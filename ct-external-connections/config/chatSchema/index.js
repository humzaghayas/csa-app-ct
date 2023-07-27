require("dotenv").config();
const chatSchema = require("./chatSchema");

const { MONGO_CHAT_COLLECTION } = process.env;

module.exports.registerSchema = (db) => {
  return db.model(MONGO_CHAT_COLLECTION, chatSchema);
  // return db;
};
