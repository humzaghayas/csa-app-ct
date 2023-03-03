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

  const Stripe = require('stripe');
  const stripe = Stripe("sk_test_51KwJWlH3EbZLIKcwo2qfo4KkDfiUfa7ekvddWW6n72tz6VdHk5sVFqQiucQ9xwh29LZMpLwKOsLS7iGROZJIwWAJ00mrbWW1df");
  
  
  export const useFetchPaymentById =  (paymentId) =>{

    const { data, error, loading } =  useMcQuery(gql`${FETCH_PAYMENT_BY_ID}`, {
      variables: {
        id:paymentId
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy:"network-only"
    });
  
    let payment =data?.payment;
  
    return {
      payment,
      loading,
      error
    };
  }

  export const useFetchCheckoutSessionById =  async (sessionId) =>{
    let session = null;
    try{
      session = await stripe.checkout.sessions.retrieve(
        sessionId
      );
    }catch(e){
      switch(e?.type){
        case 'StripeConnectionError':
          console.log("Stripe Connection Error");
          console.log(e)
          break;
        default:
          console.log("Stripe Error");
          console.log(e);
      }
    }
     
    return {
      session
    };
  }

  export const usePaymentUpdater = () => {
    const [updatePaymentById, { loading }] = useMcMutation(
      gql`${UPDATE_PAYMENT_BY_ID}`
    );
  
    const execute = async ({id,version,actions}) => {
      try {
        return await updatePaymentById({
          context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          },
          variables: {
            id:id,
            version: version,
            actions: actions
          },
        });
      } catch (graphQlResponse) {
        throw extractErrorFromGraphQlResponse(graphQlResponse);
      }
    };
  
    return {
      loading,
      execute,
    };
  };

  export const usePaymenLinkEmail = () =>{
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