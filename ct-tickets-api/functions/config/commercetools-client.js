const { createApiBuilderFromCtpClient } = require("@commercetools/platform-sdk");
// const SdkAuth = require("@commercetools/sdk-auth").default;
const fetch = require("node-fetch");
const {
  ClientBuilder
} = require ('@commercetools/sdk-client-v2')
require('dotenv').config()

const getApiRoot=()=> {
  const authMiddlewareOptions = {
    host: process.env.AUTH_URL,
    projectKey:process.env.PROJECT_KEY,
    credentials: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    scopes: [`manage_project:${process.env.PROJECT_KEY}`],
    fetch,
  }
  
  const httpMiddlewareOptions = {
    host: process.env.API_URL,
    fetch,
  }
  
  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withUserAgentMiddleware()
    .build()

  const apiRoot = createApiBuilderFromCtpClient(client);

  return apiRoot;
}

const projectKey = process.env.PROJECT_KEY;
module.exports={projectKey, getApiRoot}