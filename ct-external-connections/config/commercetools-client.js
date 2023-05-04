const { createApiBuilderFromCtpClient } = require("@commercetools/platform-sdk");
// const SdkAuth = require("@commercetools/sdk-auth").default;
const fetch = require("node-fetch");
const {
  ClientBuilder
} = require ('@commercetools/sdk-client-v2')
require('dotenv').config()

const getApiRoot=(csaProject)=> {

  const projectKey  =csaProject.CTP_PROJECT_KEY;
  const authMiddlewareOptions = {
    host: csaProject.CTP_AUTH_URL,
    projectKey:csaProject.CTP_PROJECT_KEY,
    credentials: {
      clientId: csaProject.CTP_CLIENT_ID,
      clientSecret: csaProject.CTP_CLIENT_SECRET
    },
    scopes: [`manage_project:${csaProject.CTP_PROJECT_KEY}`],
    fetch,
  }
  
  const httpMiddlewareOptions = {
    host: csaProject.CTP_API_URL,
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

module.exports={ getApiRoot}