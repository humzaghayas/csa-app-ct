const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({}, "admkin-sf");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const fetch = require("node-fetch");
const {
  getChatUpdateIncrement,
  getChatUpdateDecrement,
  createTicketMongoDB,
} = require("./function");
const app = express();

const WEBHOOK_SECRET =
  "3f15f848503040b6f576c88d74a3e1bc67f638a95f82f283c32c40db32f25490d542579f338dbb2b54a6c4767487f081";

//testing
// const WEBHOOK_SECRET =
//   "ae592f481465d74d3334d8ed771964cb328c6971a83b7fba136c178505138f7872be19881bb1ef55d790bfa0b48e6d18";

function verifySignature(body, signature) {
  const digest = crypto
    .createHmac("sha1", WEBHOOK_SECRET)
    .update(body)
    .digest("hex");
  return signature === digest;
}

app.use(cors({ origin: true }));

app.post("/webhooks", async function (req, res, next) {
  // Check if the 'x-tawk-signature' header exists
  console.log("*********inside*********");
  const signature = req.headers["x-tawk-signature"];
  console.log("***signature***: ", signature);
  if (!signature) {
    return res
      .status(400)
      .json({ error: "Signature missing in the request headers." });
  }

  if (!verifySignature(JSON.stringify(req.body), signature)) {
    console.log("Verification failed. Invalid signature.");
    return res
      .status(401)
      .json({ error: "Verification failed. Invalid signature." });
  }

  // const get = getChatNoteList();
  // console.log("get this list: ", get);
  const payload = req.body;
  console.log("payload: ", payload);
  const body = {
    projectKey: "csa-project-4",
    data: payload,
  };

  const store = fetch(
    `https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/ct_csa_api/create-startChat-db`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
        // Add any other headers if required (e.g., authorization token)
      },
      body: JSON.stringify(body),
    }
  )
    .then((response) => {
      if (response.ok) {
        console.log("Response updated to Collections", response?.json());
      } else {
        console.log("Response not updated to Collections", response);
      }
    })
    .catch((error) => {
      console.log("Error while creating object in mongodb", error);
    });
  if (payload.event === "chat:start") {
    getChatUpdateIncrement();
  }
  if (payload.event === "chat:end") {
    getChatUpdateDecrement();
  }
  if (payload.event === "ticket:create") {
    createTicketMongoDB(payload);
  }
  // console.log("fetch: ", update);
  res.status(200).json({ success: true, store });
});

// const PORT = 3000; // Replace with the desired port number
// app.listen(PORT, () => {
//   console.log(`Webhook server is listening on port ${PORT}`);
// });

exports.ct_csa_chat = functions.https.onRequest(app);
