const mongoose = require("mongoose");

const admin = new mongoose.Schema({
   projectKey:String,
   isMongoDB: Boolean,
   connectionUri: String
});

const adminSchema = new mongoose.Schema({clientInfo:[admin]});
module.exports= adminSchema;