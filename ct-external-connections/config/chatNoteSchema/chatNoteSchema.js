const mongoose = require("mongoose");

const chatNoteSchema = new mongoose.Schema({
  noteId: { type: String },
  define: { type: Number },
});
module.exports = chatNoteSchema;
