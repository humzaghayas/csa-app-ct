import {
    useMcQuery,
    useMcMutation,
    useMcLazyQuery,
    executeHttpClientRequest,
    buildApiUrl
  } from '@commercetools-frontend/application-shell';
  import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
  import { MC_API_PROXY_TARGETS , GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
  import { gql } from '@apollo/client';
  
  import createHttpUserAgent from '@commercetools/http-user-agent';
  import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
  import {FETCH_PAYMENT_BY_ID,UPDATE_PAYMENT_BY_ID} from 'ct-tickets-helper-api';
  import { extractErrorFromGraphQlResponse } from '../../helpers';
  import axios from 'axios';


  export const useSendOrderMail = () =>{
    const sendEmailAPI = useApplicationContext(
      (context) => context.environment.SEND_EMAIL_API
    );

    const userAgent = createHttpUserAgent({
      name: 'axios-client',
      version: '1.0.0',
      libraryName: window.app.applicationName,
      contactEmail: 'support@my-company.com',
    });

    const url = `${sendEmailAPI}/emailer/send-email`;

    const execute = async ( config = {},payload) => {
      const data = await executeHttpClientRequest(
        async (options) => {
          const res = await axios(buildApiUrl('/proxy/forward-to'), {
            ...config,
            headers: {
              ...options.headers,
              "Content-Type":"application/json"
            },
            withCredentials: options.credentials === 'include',
            method:"POST",
            data:payload
          });
          const data = res;
          return {
            data: res.data,
            statusCode: res.status,
            getHeader: (key) => res.headers[key],
          };
        },
        { 
          userAgent, 
          headers: config.headers,
          forwardToConfig: {
            uri: url
          }
         }
      );
      return data;
    };

    return {execute}
  }