const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  rating: { type: Number },
  feedbackDes: { type: String },
});
module.exports = feedbackSchema;
