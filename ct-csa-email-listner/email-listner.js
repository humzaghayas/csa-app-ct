const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;
const axios = require('axios').default;
require('dotenv').config();



// IMAP configuration
const imapConfig = {
  user: process.env.EMAIL_USERNAME, // Email address
  password: process.env.EMAIL_PASSWORD,      // Email password
  host: process.env.EMAIL_HOST,       // IMAP server hostname
  port: process.env.EMAIL_PORT,                      // IMAP server port (default: 993 for SSL)
  tls: true,                      // Use SSL/TLS (default: true for port 993)
  tlsOptions: {
    rejectUnauthorized: false,
  }
};

console.log(imapConfig);

// Create an IMAP instance
const imap = new Imap(imapConfig);

// Function to process the email body
function processEmailBody(body) {
  // Parse the email using mailparser
  simpleParser(body, (err, parsedEmail) => {
    if (err) {
      console.error('Error parsing email:', err);
    } else {

      //listen for related emails if the email subject is 
      //what emails do we need to check for this service will create tickets for all emails
      //how to filter the emails what is constrant 

      console.log('Subject:', parsedEmail.subject);
      console.log('From:', parsedEmail.from.text);
      console.log('Body:', parsedEmail.text);

      console.log("Email :", );

      createTicket(extractEmail(parsedEmail.from.text),parsedEmail.subject,parsedEmail.text);

    }
  });
}

function extractEmail(str){
  // Regular expression to extract email address
  const emailRegex = /<([^>]+)>/;

  // Extract the email address using the regular expression
  const emailMatch = str.match(emailRegex);

  // Check if a match was found and extract the email
  if (emailMatch && emailMatch.length > 1) {
    const email = emailMatch[1];
    return email;
  } else {
    return null;
  }
}

async function createTicket (email,subject,message){
  const ticketCreationUrl = process.env.TICKET_CREATION_URL;      
  const response = await axios.post(ticketCreationUrl+"/create/ticket",
          {
            "data":{
                "email":email,
                "category":"request",
                "contactType":"email",
                "priority":"normal",
                "subject":subject,
                "message":message       
            },
            "projectKey":"csa-project-4"
        });
        console.log("Ticket creation response",response.data);
      if(response.statusText == '200'){
        console.log("Ticket created");
      }else{
        console.log("Ticket not created",response.data);
      }
}

// Connect to the IMAP server
imap.once('ready', () => {
  console.log('Connected to IMAP server');

  // Open the INBOX mailbox
  imap.openBox('INBOX', false, (err, mailbox) => {
    if (err) {
      console.error('Error opening mailbox:', err);
      return;
    }

    console.log('Listening for new emails...');

    // Listen for new mail events
    imap.on('mail', (numNewMsgs) => {
      console.log(`New email received: ${numNewMsgs}`);

      // Fetch the latest email
      const fetch = imap.fetch(`${mailbox.messages.total}:${mailbox.messages.total}`, { bodies: '' });

      fetch.on('message', (msg) => {
        msg.on('body', (stream, info) => {
          let body = '';

          stream.on('data', (chunk) => {
            body += chunk.toString('utf8');
          });

          stream.on('end', () => {
            processEmailBody(body);
          });
        });
      });

      fetch.once('end', () => {
        console.log('Finished processing email.');
      });
    });
  });
});

imap.once('error', (err) => {
  console.error('IMAP error:', err);
});

imap.once('end', () => {
  console.log('Disconnected from IMAP server');
});

// Connect to the IMAP server
imap.connect();
