const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({}, "admkin-sf");
const { adminDBService } = require("ct-external-connections");
const express = require("express");
const cors = require("cors");
const { feedbackService } = require("./services/feedbackService");
const app = express();

// require('./ct-routes-ticekets')(app);

app.use(cors({ origin: true }));

app.post("/encrypt", async (req, res) => {
  const { value } = req.body;

  const encryptVal = await adminDBService.encryptValue(value);
  res.status(200).json({ [value]: encryptVal });
});

app.get("/reset-conf", async (req, res) => {
  await adminDBService.resetConfiguration();
  res.status(200).json({ message: "Successful!" });
});

app.post("/create-feedback-db", async (req, res) => {
  const { projectKey, data } = req.body;
  // const { projectKey } = req.session;
  console.log("create ticket:" + projectKey);

  const feedbacks = await feedbackService.createFeedback(projectKey, data);

  if (result.error) {
    res.status(400).json({ result: result.errors });
  } else {
    res.status(200).json({ feedbacks });
  }
});

exports.ct_csa_api = functions.https.onRequest(app);
