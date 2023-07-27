const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({}, "admkin-sf");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const fetch = require("node-fetch");
const app = express();

const WEBHOOK_SECRET =
  "3f15f848503040b6f576c88d74a3e1bc67f638a95f82f283c32c40db32f25490d542579f338dbb2b54a6c4767487f081";

function verifySignature(body, signature) {
  const digest = crypto
    .createHmac("sha1", WEBHOOK_SECRET)
    .update(body)
    .digest("hex");
  return signature === digest;
}

// Remove the custom middleware for capturing the raw body

// app.use(express.json()); // Use the built-in express.json() middleware to parse JSON request bodies

app.use(cors({ origin: true }));

app.post("/webhooks", async function (req, res, next) {
  // Check if the 'x-tawk-signature' header exists
  const signature = req.headers["x-tawk-signature"];
  if (!signature) {
    return res
      .status(400)
      .json({ error: "Signature missing in the request headers." });
  }

  if (!verifySignature(JSON.stringify(req.body), signature)) {
    return res
      .status(401)
      .json({ error: "Verification failed. Invalid signature." });
  }

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
  //console.log("fetch: ", store.json);
  res.status(200).json({ success: true, store });
});

// const PORT = 3000; // Replace with the desired port number
// app.listen(PORT, () => {
//   console.log(`Webhook server is listening on port ${PORT}`);
// });

exports.ct_csa_chat = functions.https.onRequest(app);
