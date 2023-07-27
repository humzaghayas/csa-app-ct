const mongoose = require("mongoose");

const Vistor = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  city: { type: String },
  country: { type: String },
});

const Sender = new mongoose.Schema({
  type: { type: String },
});

const Message = new mongoose.Schema({
  text: { type: String },
  type: { type: String },
  sender: Sender,
});

const Property = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
});

const chatSchema = new mongoose.Schema({
  chatId: { type: String },
  time: { type: Date },
  event: { type: String },
  visitor: Vistor,
  property: Property,
  message: Message,
});
module.exports = chatSchema;
