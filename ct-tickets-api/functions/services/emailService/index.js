require('dotenv').config();
const fetch = require("node-fetch");
const url = `${process.env.SEND_EMAIL_API}/emailer/send-email`;

const sendTicketCreationEmail =  (ticket)=>{
    console.log(ticket?.ticketNumber);
    const payload ={
        to: ticket?.email,
        // subject: 'Service request ${ticket?.ticketNumber} created',
        subject: `Your service request #${ticket?.ticketNumber} is created.`,
        html: `<h3>Hello, 
        <br/> We have received your request for assistance, and a support ticket has been created.</h3> 
      <br/>
      <h3> Ticket subject: ${ticket?.subject} </h3>
      <h3> Message: ${ticket?.ticketData?.message}</h3>
      <br/>
      <h3>Ticket Number: ${ticket?.ticketNumber}</h3>
      <h3>Thank you for writing to us. We appreciate your patience, as our team is looking into the issue and will get back you soon.</h3>
      <h3>Have a great day!</h3>
      `,
      }
      sendEmail(payload);
}
const sendEmail = async (payload) =>{
    console.log("URL",url);
    fetch(url,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json", // Specify the content type as JSON
                // Add any other headers if required (e.g., authorization token)
            },
            body:JSON.stringify(payload)
        }
        ).then((response)=>{
            if(response.ok){
                console.log("Email sent");
            }else{
                console.log("Email not sent",response);
            }
        }).catch((error)=>{
            console.log("Error while sending email",error);
        })
}

module.exports ={
    sendTicketCreationEmail
}