require("dotenv").config();

const orderScheduleSchema = require("./orderScheduleSchema");
const { MONGO_SCHEDULE_ORDER_COLLECTION } = process.env;

module.exports.registerSchema = (db) => {
  return db.model(MONGO_SCHEDULE_ORDER_COLLECTION, orderScheduleSchema);
};