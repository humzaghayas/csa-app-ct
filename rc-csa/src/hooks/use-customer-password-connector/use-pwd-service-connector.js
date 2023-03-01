import { gql } from '@apollo/client';
import {
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import{GET_PASSWORD_RESET_TOKEN,RESET_PASSWORD_FOR_CUSTOMER} from 'ct-tickets-helper-api'
import { extractErrorFromGraphQlResponse } from '../../helpers';
import createHttpUserAgent from '@commercetools/http-user-agent';
import {
  buildApiUrl,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';
import axios from 'axios';

export const usePasswordGetToken = () => {
  
  const [customerCreatePasswordResetToken, {  loading }] = useMcMutation(gql`${GET_PASSWORD_RESET_TOKEN}`);

  const execute = async (email) => {
    try {
      return await customerCreatePasswordResetToken({ variables: {
        email
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      } });
    }catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  }
  return {
    execute
  };
};

export const useResetPassword = () => {

  const [customerResetPassword, {  loading }] = useMcMutation(gql`${RESET_PASSWORD_FOR_CUSTOMER}`);

  const execute = async (version,tokenValue,newPassword) => {
    try {
      return await customerResetPassword({ variables: {
        version,
        tokenValue,
        newPassword
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      } });
    }catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  }
  return {
    execute
  };
};

export const useSendResetPasswordEmail = () =>{
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

  return {execute};
}
