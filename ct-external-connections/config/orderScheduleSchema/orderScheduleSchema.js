const mongoose = require("mongoose");

const orderScheduleSchema = new mongoose.Schema({
  "id": { type: String },
  "scheduleDate": { type: mongoose.Schema.Types.Date },
  "repeat": { type: mongoose.Schema.Types.String, enum: ["month", "2month", "3month"] },
  "duration": { type: Number },
  "customerId": { type: String },
  "orderId": { type: String },
  "cartId": { type: String },
  "isActive": { type: Boolean },
  "lastOrderDate": { type: mongoose.Schema.Types.Date },
  "createdAt": { type: mongoose.Schema.Types.Date, default: Date.now },
  "lastModifiedAt": { type: mongoose.Schema.Types.Date, default: Date.now },
  "createdBy": { type: String }
});

module.exports = orderScheduleSchema;