require('dotenv').config();
const adminSchema = require('./adminSchema');

const {MONGO_ADMIN_COLLECTION} = process.env;

module.exports.registerSchema = (db) => {

  return db.model(MONGO_ADMIN_COLLECTION, adminSchema);
  // return db;
}