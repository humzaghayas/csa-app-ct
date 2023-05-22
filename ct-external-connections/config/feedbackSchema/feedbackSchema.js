const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  feedbackDes: { type: String, required: true },
});
module.exports = feedbackSchema;
