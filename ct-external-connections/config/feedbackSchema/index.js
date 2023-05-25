require("dotenv").config();
const feedbackSchema = require("./feedbackSchema");

const { MONGO_FEEDBACK_COLLECTION } = process.env;

module.exports.registerSchema = (db) => {
  return db.model(MONGO_FEEDBACK_COLLECTION, feedbackSchema);
  // return db;
};
