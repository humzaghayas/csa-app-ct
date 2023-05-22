import {
    executeHttpClientRequest,
    buildApiUrl
  } from '@commercetools-frontend/application-shell';
  
  import createHttpUserAgent from '@commercetools/http-user-agent';
  import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
  import axios from 'axios';


  export const useEmailSender = () =>{
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

    const execSendEmail = async ( config = {},payload) => {
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

    return {execSendEmail}
  }