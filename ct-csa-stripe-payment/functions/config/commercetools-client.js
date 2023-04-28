const { createApiBuilderFromCtpClient } = require("@commercetools/platform-sdk");
// const SdkAuth = require("@commercetools/sdk-auth").default;
const fetch = require("node-fetch");
const {
  ClientBuilder
} = require ('@commercetools/sdk-client-v2')
require('dotenv').config()

const getApiRoot=(authOptions)=> {

  let authMiddlewareOptions ={};
  let httpMiddlewareOptions ={};
  let projectKey ="";

  if(!authOptions){
    authMiddlewareOptions = {
      host: process.env.AUTH_URL,
      projectKey:process.env.PROJECT_KEY,
      credentials: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      },
      scopes: [`manage_project:${process.env.PROJECT_KEY}`],
      fetch,
    };
    
    httpMiddlewareOptions = {
      host: process.env.API_URL,
      fetch,
    };
    
    projectKey =process.env.PROJECT_KEY;
  }else{
    authMiddlewareOptions = {
      host: authOptions.CTP_AUTH_URL,
      projectKey:authOptions.CTP_PROJECT_KEY,
      credentials: {
        clientId: authOptions.CTP_CLIENT_ID,
        clientSecret: authOptions.CTP_CLIENT_SECRET
      },
      scopes: [`manage_project:${authOptions.CTP_PROJECT_KEY}`],
      fetch,
    };

    httpMiddlewareOptions = {
      host: authOptions.CTP_API_URL,
      fetch,
    };

    projectKey = authOptions.CTP_PROJECT_KEY
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

const projectKey1 = process.env.PROJECT_KEY;
module.exports={projectKey:projectKey1, getApiRoot}