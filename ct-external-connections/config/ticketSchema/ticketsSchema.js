const mongoose = require("mongoose");


const File = new mongoose.Schema({
   "name": { type: String, default: "" },
   "url": { type: String, default: "" }
 });


 const Comment = new mongoose.Schema({
   "comment": { type: String, default: "" },
   "createdAt": { type: Date, default: Date.now }
 });

const TicketData = new mongoose.Schema({
   "message": { type: String, required: true },
   "files": [File],
   "comments": [Comment]
 });

 const History = new mongoose.Schema({
   "Priority": { type: String, required: true },
   "Status": { type: String, required: true },
   "Assigned_To": String,
   "user": String,
   "operationDate": { type: Date, default: Date.now }
 });

const ticketSchema = new mongoose.Schema( {
	"id": { type: String },
    "ticketNumber": { type: String, required: true },
    "customerId": { type: String, required: true },
    "email": { type: String, required: true },
    "source": { type: String, default:"" },
    "contactType": { type: String, default:"" },
    "status": { type: String, required: true },
    "priority": { type: String, required: true },
    "category": { type: String, required: true },
    "subject": { type: String, required: true },
    "type": String,
    "createdAt": { type: Date},
    "resolutionDate": Date,
    "responseDate": Date,
    "lastModifiedAt": { type: Date, default: Date.now },
    "createdBy": String,
    "assignedTo": String,
    "ticketData": TicketData,
    "history": [History ],
    "timeSpentOnTicket" : {type: Number, default: 0}
  });
module.exports= ticketSchema;