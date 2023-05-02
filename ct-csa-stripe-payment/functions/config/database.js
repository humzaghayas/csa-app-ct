const mongoose = require("mongoose");
require('dotenv').config();
const adminSchema = require('./adminSchema');
const { ServerApiVersion } = require("mongodb");

const {MONGO_ADMIN_URI,
    MONGO_ADMIN_DB,MONGO_TICKETS_DB} = process.env;


const connect = (uri,dbName) => {
    // Connecting to the database
    return mongoose.createConnection(uri, {dbName, useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  };

const adminConnection = () =>{
  let conn = connect(MONGO_ADMIN_URI,MONGO_ADMIN_DB);

  return adminSchema.registerSchema(conn);
}  

module.exports ={adminConnection};